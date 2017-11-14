import { getQuizByCategory } from '../controllers/Quiz/'

export default (req, res) => {
  const success = () => {
    const quiz = getQuizByCategory(req.params.category)
    res.json(quiz)
  }
  setTimeout(success, 800)
}
