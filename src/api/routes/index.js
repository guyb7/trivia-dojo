import getApp from './getApp'
import getQuiz from './getQuiz'
import postQuiz from './postQuiz'

export default app => {
  app.get ('/api/quiz/:category', getQuiz)
  app.post('/api/quiz', postQuiz)
  app.get ('/*', getApp)
}
