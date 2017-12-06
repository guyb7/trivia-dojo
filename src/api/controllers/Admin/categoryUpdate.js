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
  if (title) {
    sqlFields.push('title=$' + (params.length + 1))
    params.push(title)
  }
  if (icon) {
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
    const res = await query(sql, params)
    if (res.rowCount === 0) {
      const e = new Error('No such category')
      e.noCatch = true
      throw e
    } else if (res.rowCount > 1) {
      console.error(res)
      const e = new Error('Updated rows: ' + res.rowCount)
      e.noCatch = true
      throw e
    }
  } catch (e) {
    e.noCatch = true
    throw e
  }
}
