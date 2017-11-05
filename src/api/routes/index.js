import getApp from './getApp'
import getQuiz from './getQuiz'

export default app => {
  app.get('/api/quiz/:category', getQuiz)
  app.get('/*', getApp)
}
