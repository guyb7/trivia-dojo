import { getQuizByCategory } from '../controllers/Quiz/'
import { parseError } from './Errors'

export default (req, res) => {
  const success = async () => {
    try {
      const quiz = await getQuizByCategory(req.params.category)
      res.json(quiz)
    } catch (e) {
      parseError(res, e)
    }
  }
  setTimeout(success, 800)
}
