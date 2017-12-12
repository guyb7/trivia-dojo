import { query } from '../../Server/DB'

export default async ({ userId, quizId }) => {
  const res = await query(
    'DELETE FROM user_quizes WHERE id=$1 AND user_id=$2',
    [quizId, userId]
  )
  if (res.rowCount !== 1) {
    console.error('No user-quiz to delete', userId, quizId, res)
  }
}
