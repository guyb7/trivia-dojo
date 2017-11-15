import { getProfile } from '../controllers/User/'
import { parseError } from './Errors'

export default (req, res) => {
  const success = async () => {
    try {
      const profile = await getProfile(req)
      res.json(profile)
    } catch (e) {
      parseError(res, e)
    }
  }
  setTimeout(success, 250)
}
