import { query } from '../../Server/DB'

export default async ({ userId, xp }) => {
  const res = await query('UPDATE users SET xp = xp + $2 WHERE id=$1', [userId, xp])
  if (res.rowCount === 0) {
    const e = new Error('No such user')
    e.noCatch = true
    throw e
  }
}
