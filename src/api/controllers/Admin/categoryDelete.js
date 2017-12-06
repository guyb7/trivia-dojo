import { query } from '../../Server/DB'

export default async req => {
  const category = req.params.category
  try {
    const res = await query('DELETE FROM categories WHERE id=$1', [category])
    if (res.rowCount === 0) {
      const e = new Error('No such category')
      e.noCatch = true
      throw e
    } else if (res.rowCount > 1) {
      console.error(res)
      const e = new Error('Deleted rows: ' + res.rowCount)
      e.noCatch = true
      throw e
    }
  } catch (e) {
    e.noCatch = true
    throw e
  }
}
