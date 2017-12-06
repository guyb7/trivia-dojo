import { authPassword } from '../Server/Auth'
import { isAdmin, registerIfNotLoggedIn } from '../controllers/User'

import getApp from './getApp'
import getStatus from './getStatus'
import getProfile from './getProfile'
import postRegister from './postRegister'
import getQuiz from './getQuiz'
import postQuiz from './postQuiz'
import { notFound, parseError, serverError } from './Errors'

const asyncMiddleware = promise => {
  return (req, res) => {
    promise(req)
    .then(data => {
      res.json({
        success: true,
        ...data
      })
    })
    .catch(e => {
      parseError(res, e)
    })
  }
}

const ensureAdmin = (req, res, next) => {
  isAdmin(req)
  .then(() => {
    next()
  })
  .catch(e => {
    next(e)
  })
}

export default app => {
  app.post('/api/login', authPassword)
  app.post('/api/register', postRegister)

  app.use ('/api/*', registerIfNotLoggedIn)
  app.get ('/api/status', asyncMiddleware(getStatus))
  app.get ('/api/profile', asyncMiddleware(getProfile))
  app.get ('/api/quiz/:category', getQuiz)
  app.post('/api/quiz', postQuiz)
  
  app.get ('/api/admin', ensureAdmin, (req, res) => { res.json({ admin: true })})

  app.get ('/api/*', notFound)
  app.use (serverError)

  app.get ('/*', getApp)
}
