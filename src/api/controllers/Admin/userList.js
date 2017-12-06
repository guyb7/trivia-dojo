import { query } from '../../Server/DB'

export default async req => {
  try {
    const fields = ['id', 'role', 'name', 'xp'].join(', ')
    const users = await query(`SELECT ${fields} FROM users`, [])
    return {
      users: users.rows
    }
  } catch (e) {
    e.noCatch = true
    throw e
  }
}
