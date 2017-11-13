import getByCategory from '../controllers/Quiz/getByCategory'

export default (req, res) => {
  const success = () => {
    const quiz = getByCategory(req.params.category)
    res.json(quiz)
  }
  setTimeout(success, 800)
}
