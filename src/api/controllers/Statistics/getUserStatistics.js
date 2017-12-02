import getStatistics from './getStatisticsList'
import { query } from '../../Server/DB'

export default async userId => {
  const all = getStatistics()
  const userData = await query('SELECT key, value FROM user_statistics WHERE user_id=$1', [userId])
  const userMap = userData.rows.reduce((acc, stat) => {
    acc[stat.key] = { ...stat }
    return acc
  }, {})
  const res = all.map(stat => {
    return {
      key: stat.key,
      text: stat.text,
      number: userMap[stat.key] ? userMap[stat.key].value : stat.default
    }
  })
  return res
}
