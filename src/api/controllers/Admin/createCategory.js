import { query } from '../../Server/DB'

export default async req => {
  const { id, title, icon } = req.body
  const sql = `
    INSERT INTO categories(id, title, icon)
    VALUES ($1, $2, $3)
  `
  try {
    await query(sql, [id, title, icon])
  } catch (e) {
    e.noCatch = true
    throw e
  }
}
