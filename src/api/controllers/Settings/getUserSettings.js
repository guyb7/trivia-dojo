import Promise from 'bluebird'

export default userId => {
  return new Promise((resolve, reject) => {
    resolve({
      locale: 'en-US'
    })
  })
}
