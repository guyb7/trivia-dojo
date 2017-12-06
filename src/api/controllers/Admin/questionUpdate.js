import { query } from '../../Server/DB'

export default async req => {
  const id = req.params.question
  const { question, options, answer, category, rank } = req.body
  const params = [id]
  const sqlFields = []
  if (question) {
    sqlFields.push('question=$' + (params.length + 1))
    params.push(question)
  }
  if (options) {
    sqlFields.push('options=$' + (params.length + 1))
    params.push(JSON.stringify(options))
  }
  if (answer) {
    sqlFields.push('answer=$' + (params.length + 1))
    params.push(answer)
  }
  if (category) {
    sqlFields.push('category=$' + (params.length + 1))
    params.push(category)
  }
  if (rank) {
    sqlFields.push('rank=$' + (params.length + 1))
    params.push(rank)
  }
  if (params.length === 1) {
    return
  }
  const sql = `
    UPDATE questions
    SET ${sqlFields.join(', ')}
    WHERE id=$1;
  `
  try {
    const res = await query(sql, params)
    if (res.rowCount === 0) {
      const e = new Error('No such question')
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
