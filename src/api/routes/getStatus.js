export default async req => {
  return {
    user: req.user,
    session: req.session
  }
}
