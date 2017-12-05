import { query } from '../../Server/DB'

export default async userId => {
  const sql = `
    SELECT c.id, c.title, c.icon, u.rank FROM user_categories u
    JOIN categories c ON u.category_id = c.id
    WHERE u.user_id=$1`
  const res = await query(sql, [userId])
  return res.rows
}
