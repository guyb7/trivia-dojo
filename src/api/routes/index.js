import { authPassword } from '../Server/Auth'
import { registerIfNotLoggedIn } from '../controllers/User'

import getApp from './getApp'
import getStatus from './getStatus'
import getProfile from './getProfile'
import postRegister from './postRegister'
import getQuiz from './getQuiz'
import postQuiz from './postQuiz'
import { notFound, serverError } from './Errors'

export default app => {
  app.post('/user/login', authPassword)
  app.post('/api/register', postRegister)
  
  app.use ('/api/*', registerIfNotLoggedIn)
  app.get ('/api/status', getStatus)
  app.get ('/api/profile', getProfile)
  app.get ('/api/quiz/:category', getQuiz)
  app.post('/api/quiz', postQuiz)
  app.get ('/api/*', notFound)
  app.use(serverError)
  
  app.get ('/*', getApp)
}
