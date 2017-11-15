import Promise from 'bluebird'

const mockDbUsers = {
  123: {
    id: 123,
    name: 'Youzer',
    role: 'user'
  }
}

export default userId => {
  return new Promise((resolve, reject) => {
    if (mockDbUsers[userId]) {
      resolve(mockDbUsers[userId])
    } else {
      reject(new Error('user-not-found'))
    }
  })
}
