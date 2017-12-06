import { authPassword } from '../Server/Auth'
import { isAdmin, registerIfNotLoggedIn } from '../controllers/User'

import getApp from './getApp'
import getStatus from './getStatus'
import getProfile from './getProfile'
import postRegister from './postRegister'
import getQuiz from './getQuiz'
import postQuiz from './postQuiz'
import adminGetCategories from '../controllers/Admin/getCategories'
import adminCreateCategory from '../controllers/Admin/createCategory'
import adminGetQuestions from '../controllers/Admin/getQuestions'
import adminGetUsers from '../controllers/Admin/getUsers'
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
  app.get ('/api/quiz/:category', asyncMiddleware(getQuiz))
  app.post('/api/quiz', asyncMiddleware(postQuiz))

  app.use ('/api/admin/*', ensureAdmin)
  app.get ('/api/admin/categories', asyncMiddleware(adminGetCategories))
  app.post('/api/admin/categories', asyncMiddleware(adminCreateCategory))
  app.get ('/api/admin/questions/:category', asyncMiddleware(adminGetQuestions))
  app.get ('/api/admin/users', asyncMiddleware(adminGetUsers))

  app.get ('/api/*', notFound)
  app.use (serverError)

  app.get ('/*', getApp)
}
