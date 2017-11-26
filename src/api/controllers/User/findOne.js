import { query } from '../../Server/DB'

export default async ({ userId, email }) => {
  const users = userId ?
    await query('SELECT * FROM users WHERE id=$1', [userId])
      :
    await query('SELECT * FROM users WHERE email=$1', [email])
  if (users.rowCount !== 1) {
    throw new Error('user-not-found')
  }
  const user = users.rows[0]
  return user
}
