export default (req, res) => {
  res.json({
    success: true,
    user: req.user,
    session: req.session
  })
}
