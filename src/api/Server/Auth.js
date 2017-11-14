import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const mockDbUsers = {
  123: {
    id: 123,
    name: 'Youzer',
    role: 'user'
  }
}

passport.use(new LocalStrategy(
  (username, password, done) => {
    if (username === 'user' && password === 'pass') {
      return done(null, mockDbUsers[123])
    } else {
      return done(null, false, { message: 'Incorrect username.' })
    }
  }
))

const mountAuth = app => {
  app.use(passport.initialize())
  app.use(passport.session())
}

const authPassword = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    delete req.session.user
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      })
    }
    req.session.user = user
    return res.json({
      success: true,
      user
    })
  })(req, res, next)
}

export {
  authPassword,
  mountAuth
}
