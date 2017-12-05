import EloRank from 'elo-rank'

import { getUserCategories } from '../Categories'
import { query } from '../../Server/DB'

const elo = new EloRank(20)

const getQuestionsData = async userAnswers => {
  const ids = userAnswers.reduce((acc, q) => {
    acc.push(q.id.replace(/[^0-9a-f-]/g, ''))
    return acc
  }, [])
  const idsSql = ids.join("','")
  const res = await query(`
    SELECT id, answer, category, rank
    FROM questions
    WHERE id IN ('${idsSql}')
  `)
  const dict = res.rows.reduce((acc, q) => {
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

const updateUserRanks = async userNewRanks => {
  //TODO
  console.log('userNewRanks', userNewRanks)
}

const updateQuestionsRank = async questionsNewRanks => {
  //TODO
  console.log('questionsNewRanks', questionsNewRanks)
}

// Calcs the ELO rank for each question.
// Each question is updated compared to the user category rank before the submission.
// The user category rank is updated to the average of the ranks with every question.
export default async req => {
  const userAnswers = req.body.questions
  const questions = await getQuestionsData(userAnswers)
  const userRanks = await getUserRanks(req.session.user.id)
  let score = 0
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
    return acc
  }, {})

  await updateUserRanks(userNewRanks)
  await updateQuestionsRank(questionsNewRanks)

  return {
    success: true,
    results,
    summary: {
      maxQuizScore,
      score
    },
    profileChanges: {
      xp: score,
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
