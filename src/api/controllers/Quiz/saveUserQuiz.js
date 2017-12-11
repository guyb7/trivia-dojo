import uuid from 'uuid/v4'
import { query } from '../../Server/DB'

export default async ({ questions, category, mode, userId }) => {
  const quizKey = `${category}_${mode}`
  const id = uuid()
  const questionsIds = questions.reduce((acc, q) => {
    acc.push(q.id)
    return acc
  }, [])
  await query(
    `INSERT INTO user_quizes(
      id, user_id, quiz_key, data)
      VALUES ($1, $2, $3, $4)`,
    [id, userId, quizKey, JSON.stringify(questionsIds)]
  )
  return id
}
