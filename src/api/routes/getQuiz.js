import { getQuizByCategory } from '../controllers/Quiz/'

export default (req, res) => {
  const success = async () => {
    const quiz = await getQuizByCategory(req.params.category)
    res.json(quiz)
  }
  setTimeout(success, 800)
}
