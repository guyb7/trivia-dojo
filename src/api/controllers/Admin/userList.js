import { query } from '../../Server/DB'

export default async req => {
  try {
    const fields = ['u.id', 'u.role', 'u.name', 'u.xp', 'ROUND(AVG(rank)) AS rank']
    const users = await query(`
      SELECT ${fields.join(', ')} FROM users u
      JOIN user_categories c ON u.id = c.user_id
      GROUP BY u.id
    `, [])
    return {
      users: users.rows
    }
  } catch (e) {
    e.noCatch = true
    throw e
  }
}
