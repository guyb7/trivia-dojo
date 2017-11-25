import { register } from './register'

export default async (req, res, next) => {
  if (req.session.user && req.session.user.id) {
    return next()
  }
  const user = await register({ name: 'Guest', role: 'guest' })
  req.session.user = user
  next()
}
