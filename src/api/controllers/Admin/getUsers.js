import { query } from '../../Server/DB'

export default async req => {
  const fields = ['id', 'role', 'name', 'xp'].join(', ')
  const users = await query(`SELECT ${fields} FROM users`, [])
  return {
    users: users.rows
  }
}
