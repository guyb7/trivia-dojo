export default (req, res) => {
  const success = () => {
    res.json({
      success: true,
      name: 'Rick',
      id: '1234-1234-1234-1234',
      isLoggedIn: true,
      xp: 210
    })
  }
  setTimeout(success, 250)
}
