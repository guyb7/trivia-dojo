import { getProfile } from '../controllers/User/'

export default (req, res) => {
  const success = async () => {
    try {
      const profile = await getProfile(req)
      res.json(profile)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  setTimeout(success, 250)
}
