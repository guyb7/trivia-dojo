import Promise from 'bluebird'
import uuid from 'uuid/v4'

export default ({ email, name, role, password }) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: uuid(),
      name,
      role
    }
    resolve(user)
  })
}
