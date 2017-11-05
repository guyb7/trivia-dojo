export default (req, res) => {
  res.json({
    ya: req.params.category
  })
}
