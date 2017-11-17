import { query } from '../../Server/DB'

export default async userId => {
  const res = await query('SELECT * FROM categories', [])
  return res.rows
}
