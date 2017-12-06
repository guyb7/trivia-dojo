import { query } from '../../Server/DB'

export default async req => {
  try {
    const categories = await query('SELECT * FROM categories', [])
    return {
      categories: categories.rows
    }
  } catch (e) {
    e.noCatch = true
    throw e
  }
}
