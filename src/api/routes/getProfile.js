import { getProfile } from '../controllers/User/'

export default async req => {
  const profile = await getProfile(req)
  return profile
}
