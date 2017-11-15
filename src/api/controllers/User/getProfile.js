import Promise from 'bluebird'

import findUser from './findOne'
import { getUserProgress } from '../Progress/'
import { getUserCategories } from '../Categories/'
import { getUserSettings } from '../Settings/'

export default async req => {
  const userId = req.session.user.id
  const results = await Promise.props({
    user: findUser(userId),
    progress: getUserProgress(userId),
    categories: getUserCategories(userId),
    settings: getUserSettings(userId)
  })
  return {
    success: true,
    id: results.user.id,
    user: results.user,
    progress: results.progress,
    categories: results.categories,
    settings: results.settings
  }
}
