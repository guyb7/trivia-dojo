import EloRank from 'elo-rank'
import _each from 'lodash/each'
import _mean from 'lodash/mean'

import clearUserQuiz from './clearUserQuiz'
import addXp from '../Progress/addXp'
import getUserQuiz from './getUserQuiz'
import getQuestionsById from './getQuestionsById'
import { getUserCategories } from '../Categories'
import { query } from '../../Server/DB'

const elo = new EloRank(20)
const MINIMUM_XP_FOR_QUIZ = 20

const getQuestionsData = async quizId => {
  const userQuiz = await getUserQuiz({ quizId })
  if (!userQuiz) {
    throw new Error('no-such-quiz')
  }
  const quizQuestions = await getQuestionsById(userQuiz.questions)
  const dict = quizQuestions.rows.reduce((acc, q) => {
    acc[q.id] = { ...q }
    return acc
  }, {})
  return dict
}

const getUserRanks = async userId => {
  const categories = await getUserCategories(userId)
  return categories.reduce((acc, c) => {
    acc[c.id] = c.rank
    return acc
  }, {})
}

const calcRanks = (userRank, questionRank, isCorrect) => {
  // Probability to get a correct answer - 0-1
  const expectedUser = elo.getExpected(userRank, questionRank)
  const expectedQuestion = 1 - expectedUser

  const newUserRank = elo.updateRating(expectedUser, isCorrect ? 1 : 0, userRank)
  const newQuestionRank = elo.updateRating(expectedQuestion, isCorrect ? 0 : 1, questionRank)

  return {
    user: Math.round(newUserRank),
    question: Math.round(newQuestionRank)
  }
}

const updateUserRanks = async (userNewRanks, userId) => {
  const queries = []
  _each(userNewRanks, (ranks, category) => {
    const avg = Math.round(_mean(ranks))
    queries.push({
      sql: `
      UPDATE user_categories
      SET rank=$3
      WHERE user_id=$1 AND category_id=$2
      `,
      params: [userId, category, avg]
    })
  })
  for (let q of queries) {
    await query(q.sql, q.params)
  }
}

const updateQuestionsRank = async questionsNewRanks => {
  //TODO use prepared statements
  const queries = []
  _each(questionsNewRanks, question => {
    queries.push({
      sql: `
      UPDATE questions
      SET rank=$2
      WHERE id=$1
      `,
      params: [question.id, question.newRank]
    })
  })
  for (let q of queries) {
    await query(q.sql, q.params)
  }
}

// Calcs the ELO rank for each question.
// Each question is updated compared to the user category rank before the submission.
// The user category rank is updated to the average of the ranks with every question.
export default async req => {
  const userId = req.session.user.id
  const userAnswers = req.body.questions
  const quizId = req.params.quizId
  const questions = await getQuestionsData(quizId)
  const userRanks = await getUserRanks(userId)
  let score = 0
  let xp = MINIMUM_XP_FOR_QUIZ
  let maxQuizScore = 0
  const userNewRanks = {}
  const questionsNewRanks = []

  const results = userAnswers.reduce((acc, answer) => {
    const question = questions[answer.id]
    const is_correct = answer.answer === question.answer

    const userRank = userRanks[question.category]
    const newRanks = calcRanks(userRank, question.rank, is_correct)
    if (!userNewRanks[question.category]) {
      userNewRanks[question.category] = []
    }
    userNewRanks[question.category].push(newRanks.user)
    questionsNewRanks.push({
      id: question.id,
      newRank: newRanks.question
    })

    const questionScore = is_correct ? newRanks.user - userRank : 0
    maxQuizScore += Math.abs(newRanks.user - userRank)
    score += questionScore
    acc[answer.id] = {
      correctAnswer: question.answer,
      isCorrect: is_correct,
      score: questionScore
    }

    if (is_correct) {
      xp++
    }

    return acc
  }, {})

  await updateUserRanks(userNewRanks, userId)
  await updateQuestionsRank(questionsNewRanks)
  await addXp({ userId, xp })
  await clearUserQuiz({ userId, quizId })

  return {
    success: true,
    results,
    summary: {
      maxQuizScore,
      score
    },
    profileChanges: {
      xp,
      achievements: [
        {
          image: 'MusicNote',
          name: 'Music Master'
        }
      ],
      newCategories: [
        {
          id: 'food',
          title: 'Food',
          icon: 'Food'
        }, {
          id: 'brands',
          title: 'Brands',
          icon: 'Label'
        }
      ]
    }
  }
}
