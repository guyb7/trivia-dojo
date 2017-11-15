import Promise from 'bluebird'

import findUser from './findOne'
import { getUserCategories } from '../Categories/'
import { getUserSettings } from '../Settings/'

export default async req => {
  const userId = req.session.user.id
  const results = await Promise.props({
    user: findUser(userId),
    categories: getUserCategories(userId),
    settings: getUserSettings(userId)
  })
  return {
    success: true,
    id: results.user.id,
    user: results.user,
    categories: results.categories,
    settings: results.settings
  }
}
