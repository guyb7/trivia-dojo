import AchievementsList from './getAchievementsList'
import { query } from '../../Server/DB'

export default async userId => {
  const all = AchievementsList()
  const userData = await query('SELECT * FROM achievements_progress WHERE user_id=$1', [userId])
  const userMap = userData.rows.reduce((acc, achievement) => {
    acc[achievement.key] = { ...achievement }
    if (acc[achievement.key].value === null) {
      delete acc[achievement.key].value
    }
    return acc
  }, {})
  const res = all.map(achievement => {
    if (userMap[achievement.key]) {
      return {
        ...achievement,
        ...(userMap[achievement.key])
      }
    } else {
      return {
        ...achievement,
        status: 'locked'
      }
    }
  })
  return res
}
