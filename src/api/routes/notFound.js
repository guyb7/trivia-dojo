export default (req, res) => {
  res.status(404).json({
    success: false,
    error: 'no-such-route'
  })
}
