import { submitQuiz } from '../controllers/Quiz/'

export default async req => {
  const results = await submitQuiz(req)
  return results
}
