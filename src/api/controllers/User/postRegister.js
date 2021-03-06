import bcrypt from 'bcrypt'

import { registerExisting } from './register'
import validateRegistrationFields from './validateRegistrationFields'

const saltRounds = 10

export default async req => {
  if (!req.session || !req.session.user || !req.session.user.id) {
    throw new Error('no-user-id-in-session')
  }
  const id = req.session.user.id
  const { name, email, password } = req.body
  validateRegistrationFields({ name, email, password })
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = await registerExisting({ id, name, email, passwordHash })
  return user
}
