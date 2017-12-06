import findOne from './findOne'

export default async req => {
  const user = await findOne({ userId: req.session.user.id })
  if (user.role === 'admin') {
    return true
  }
  throw new Error('not-authorized')
}
