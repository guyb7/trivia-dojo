import { submitQuiz } from '../controllers/Quiz/'

export default (req, res) => {
  const success = async () => {
    const results = await submitQuiz(req.body.questions)
    res.json(results)
  }
  setTimeout(success, 800)
}
