import { authPassword } from '../Server/Auth'
import { registerIfNotLoggedIn } from '../controllers/User'

import getApp from './getApp'
import getStatus from './getStatus'
import getProfile from './getProfile'
import getQuiz from './getQuiz'
import postQuiz from './postQuiz'
import notFound from './notFound'

export default app => {
  app.post('/user/login', authPassword)

  app.use('/api/*', registerIfNotLoggedIn)
  app.get ('/api/status', getStatus)
  app.get ('/api/profile', getProfile)
  app.get ('/api/quiz/:category', getQuiz)
  app.post('/api/quiz', postQuiz)
  app.get ('/api/*', notFound)

  app.get ('/*', getApp)
}
