import getApp from './getApp'
import getStatus from './getStatus'
import getProfile from './getProfile'
import getQuiz from './getQuiz'
import postQuiz from './postQuiz'

export default app => {
  app.get ('/api/status', getStatus)
  app.get ('/api/profile', getProfile)
  app.get ('/api/quiz/:category', getQuiz)
  app.post('/api/quiz', postQuiz)
  app.get ('/*', getApp)
}
