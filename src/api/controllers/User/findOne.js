import Promise from 'bluebird'

const mockDbFetch = userId => new Promise((resolve, reject) => {
  resolve({
    id: 1234,
    name: 'Guest',
    role: 'guest'
  })
})

export default async userId => {
  try {
    const user = mockDbFetch(userId)
    return user
  } catch (e) {
    throw new Error('user-not-found')
  }
}
