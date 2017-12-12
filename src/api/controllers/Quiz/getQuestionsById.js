import { query } from '../../Server/DB'

export default async questions => {
  const sql = `
    SELECT * FROM questions
    WHERE id IN ('${questions.join("', '")}')`
  return await query(sql, [])
}
