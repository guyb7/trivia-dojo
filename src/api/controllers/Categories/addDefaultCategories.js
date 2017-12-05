import { query } from '../../Server/DB'

export default async userId => {
  const sql = `
    INSERT INTO trivia.user_categories (user_id, category_id) VALUES
      ($1, 'geography'),
      ($1, 'history'),
      ($1, 'movies'),
      ($1, 'music'),
      ($1, 'pop'),
      ($1, 'sports')`
  await query(sql, [userId])
}
