const mockDbUsers = {}

export default (req, res, next) => {
  if (req.session.user && req.session.user.id) {
    return next()
  }
  const id = Math.round(Math.random() * 10000)
  if (mockDbUsers[id]) {
    return next(new Error('User ' + id + 'already exists'))
  }
  mockDbUsers[id] = {
    id,
    name: 'Guest',
    role: 'guest'
  }
  req.session.user = mockDbUsers[id]
  return next()
}
