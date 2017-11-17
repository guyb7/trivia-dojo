import { query } from '../../Server/DB'
import _sampleSize from 'lodash/sampleSize'
import _shuffle from 'lodash/shuffle'

const QUESTIONS_PER_QUIZ = 10

export default async category => {
  const res = await query('SELECT * FROM questions WHERE category=$1', [category])
  const questions = _shuffle(_sampleSize(res.rows, QUESTIONS_PER_QUIZ))
  const shuffledAnswers = questions.map(q => ({
    id: q.id,
    question: q.question,
    options: _shuffle(q.options)
  }))
  return {
    category,
    questions: shuffledAnswers
  }
}
