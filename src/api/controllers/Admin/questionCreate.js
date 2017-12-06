import uuid from 'uuid/v4'
import { query } from '../../Server/DB'

export default async req => {
  const { question, options, answer, category, rank = 1500 } = req.body
  const id = uuid()
  const sql = `
    INSERT INTO questions (id, question, options, answer, category, rank)
    VALUES ($1, $2, $3, $4, $5, $6)
  `
  try {
    await query(sql, [id, question, JSON.stringify(options), answer, category, rank])
    return {
      id
    }
  } catch (e) {
    e.noCatch = true
    throw e
  }
}
