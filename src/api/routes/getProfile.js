import getProfile from '../controllers/User/getProfile'

export default (req, res) => {
  const success = () => {
    const profile = getProfile(req)
    res.json(profile)
  }
  setTimeout(success, 250)
}
