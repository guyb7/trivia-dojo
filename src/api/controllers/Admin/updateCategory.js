import { query } from '../../Server/DB'

export default async req => {
  const category = req.params.category
  const { id, title, icon } = req.body
  const params = [category]
  const sqlFields = []
  if (id) {
    sqlFields.push('id=$' + (params.length + 1))
    params.push(id)
  }
  if (id) {
    sqlFields.push('title=$' + (params.length + 1))
    params.push(title)
  }
  if (id) {
    sqlFields.push('icon=$' + (params.length + 1))
    params.push(icon)
  }
  if (params.length === 1) {
    return
  }
  const sql = `
    UPDATE categories
    SET ${sqlFields.join(', ')}
    WHERE id=$1;
  `
  try {
    await query(sql, params)
  } catch (e) {
    e.noCatch = true
    throw e
  }
}
