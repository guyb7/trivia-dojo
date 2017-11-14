import { submitQuiz } from '../controllers/Quiz/'

export default (req, res) => {
  const success = () => {
    const results = submitQuiz(req.body.questions)
    res.json(results)
  }
  setTimeout(success, 800)
}
