import { query } from '../../Server/DB'
import _sampleSize from 'lodash/sampleSize'
import _shuffle from 'lodash/shuffle'

import getUserQuiz from './getUserQuiz'
import getQuestionsById from './getQuestionsById'
import saveUserQuiz from './saveUserQuiz'

const QUESTIONS_PER_QUIZ = 10

const getByCategory = async (category, mode, userId) => {
  return await query('SELECT * FROM questions WHERE category=$1', [category])
}

const shuffleAndMap = questions => {
  const shuffledQuestions = _shuffle(_sampleSize(questions, QUESTIONS_PER_QUIZ))  
  return shuffledQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: _shuffle([ ...q.options, q.answer ])
  }))
}

export default async ({ category, mode, userId }) => {
  const existingQuiz = await getUserQuiz({ category, mode, userId })
  let quizId
  let questions
  if (existingQuiz) {
    const res = await getQuestionsById(existingQuiz.questions)
    questions = shuffleAndMap(res.rows)
    quizId = existingQuiz.id
    //TODO keep original questions/answers order
  } else {
    const res = await getByCategory(category, mode, userId)
    questions = shuffleAndMap(res.rows)
    quizId = await saveUserQuiz({ questions, category, mode, userId })
  }
  return {
    category,
    questions,
    quizId
  }
}
