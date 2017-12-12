import { query } from '../../Server/DB'

export default async ({ category, mode, userId, quizId }) => {
  const quizKey = `${category}_${mode}`
  let res
  if (quizId) {
    res = await query(
      `SELECT * FROM user_quizes WHERE id=$1`,
      [quizId]
    )
  } else {
    res = await query(
      `SELECT * FROM user_quizes WHERE user_id=$1 AND quiz_key=$2`,
      [userId, quizKey]
    )
  }
  if (res.rows.length > 0) {
    const quiz = res.rows[0]
    return {
      id: quiz.id,
      questions: quiz.data
    }
  }
  return false
}
