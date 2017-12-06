import { query } from '../../Server/DB'

export default async req => {
  const question = req.params.question
  try {
    const res = await query('DELETE FROM questions WHERE id=$1', [question])
    if (res.rowCount === 0) {
      const e = new Error('No such question')
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
