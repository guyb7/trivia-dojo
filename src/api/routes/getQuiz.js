import { getQuizByCategory } from '../controllers/Quiz/'

export default async req => {
  const quiz = await getQuizByCategory(req.params.category)
  return quiz
}
