import { getQuestions } from '../controllers/Quiz/'

export default async req => {
  const { category = 'general', mode = 'casual' } = req.query
  const userId = req.session.user.id
  const quiz = await getQuestions({ category, mode, userId })
  return quiz
}
