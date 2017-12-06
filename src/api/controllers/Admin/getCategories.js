import { query } from '../../Server/DB'

export default async req => {
  const categories = await query('SELECT * FROM categories', [])
  return {
    categories: categories.rows
  }
}
