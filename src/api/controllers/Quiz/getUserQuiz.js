import { query } from '../../Server/DB'

export default async ({ category, mode, userId }) => {
  const quizKey = `${category}_${mode}`
  const res = await query(
    `SELECT * FROM user_quizes WHERE user_id=$1 AND quiz_key=$2`,
    [userId, quizKey]
  )
  if (res.rows.length > 0) {
    return {
      questions: res.rows[0].data
    }
  }
  return false
}
