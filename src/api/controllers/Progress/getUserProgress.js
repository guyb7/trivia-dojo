import { query } from '../../Server/DB'

export default async userId => {
  const result = await query('SELECT xp FROM users WHERE id=$1', [userId])
  if (result.rowCount !== 1) {
    throw new Error('xp-not-found')
  }
  return {
    xp: result.rows[0].xp || 0
  }
}
