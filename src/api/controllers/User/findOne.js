import { query } from '../../Server/DB'

export default async userId => {
  const users = await query('SELECT * FROM users WHERE id=$1', [userId])
  if (users.rowCount !== 1) {
    throw new Error('user-not-found')
  }
  const user = users.rows[0]
  return user
}
