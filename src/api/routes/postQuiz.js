import { submitQuiz } from '../controllers/Quiz/'
import { parseError } from './Errors'

export default (req, res) => {
  const success = async () => {
    try {
      const results = await submitQuiz(req.body.questions)
      res.json(results)
    } catch (e) {
      parseError(res, e)
    }
  }
  setTimeout(success, 800)
}
