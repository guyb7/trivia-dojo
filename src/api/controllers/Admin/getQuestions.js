import { query } from '../../Server/DB'

export default async req => {
  const category = req.params.category
  const questions = await query('SELECT * FROM questions WHERE category=$1', [category])
  return {
    questions: questions.rows
  }
}
