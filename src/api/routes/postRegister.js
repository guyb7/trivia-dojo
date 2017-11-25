import { postRegister } from '../controllers/User/'
import { parseError } from './Errors'

export default (req, res) => {
  const success = async () => {
    try {
      const user = await postRegister(req)
      res.json(user)
    } catch (e) {
      parseError(res, e)
    }
  }
  setTimeout(success, 250)
}
