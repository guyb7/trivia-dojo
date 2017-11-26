import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import findUser from '../controllers/User/findOne'

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await findUser({ email })
      const isValid = await validatePassword(password, user.password)
      if (!isValid) {
        throw new Error()
      }
      return done(null, {
        id: user.id,
        name: user.name,
        role: user.role
      })
    } catch (e) {
      return done(null, false)
    }
  }
))

const mountAuth = app => {
  app.use(passport.initialize())
  app.use(passport.session())
}

const validatePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash)
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
