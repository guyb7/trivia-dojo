import Promise from 'bluebird'

export default userId => {
  return new Promise((resolve, reject) => {
    resolve({
      xp: 210,
      achievements: {}
    })
  })
}
