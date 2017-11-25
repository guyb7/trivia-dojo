import bcrypt from 'bcrypt'

import getProfile from './getProfile'
import { registerExisting } from './register'
import registerIfNotLoggedIn from './registerIfNotLoggedIn'

const saltRounds = 10

const postRegister = async (req) => {
  if (!req.session || !req.session.user || !req.session.user.id) {
    throw new Error('no-user-id-in-session')
  }
  const id = req.session.user.id
  const { name, email, password } = req.body
  if (!name || name.length === 0 || !email || email.length === 0 || !password || password.length < 6) {
    throw new Error('invalid-registr-fields')
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = await registerExisting({ id, name, email, passwordHash })
  return user
}

export {
  postRegister,
  getProfile,
  registerIfNotLoggedIn
}
