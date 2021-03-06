import Promise from 'bluebird'
import _pick from 'lodash/pick'

import findUser from './findOne'
import safeFields from './safeFields'
import { getUserProgress } from '../Progress/'
import { getUserCategories } from '../Categories/'
import { getUserSettings } from '../Settings/'
import { getUserAchievements } from '../Achievements/'
import { getUserStatistics } from '../Statistics/'

export default async req => {
  const userId = req.session.user.id
  const results = await Promise.props({
    user: findUser({ userId }),
    progress: getUserProgress(userId),
    categories: getUserCategories(userId),
    settings: getUserSettings(userId),
    achievements: getUserAchievements(userId),
    statistics: getUserStatistics(userId)
  })
  return {
    id: results.user.id,
    user: safeFields(results.user),
    progress: results.progress,
    categories: results.categories.map(c => _pick(c, ['id', 'title', 'icon'])),
    settings: results.settings,
    achievements: results.achievements,
    statistics: results.statistics
  }
}
