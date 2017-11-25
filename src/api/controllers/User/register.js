import uuid from 'uuid/v4'

import { query } from '../../Server/DB'

const register = async ({ name, role, password = null, email = null }) => {
  const id = uuid()
  const res = await query('INSERT INTO users (id, name, role, email, password) VALUES ($1, $2, $3, $4, $5)', [
    id,
    name,
    role,
    email,
    password
  ])
  if (res.rowCount !== 1) {
    throw new Error('register-user-failed')
  }
  return {
    id,
    name,
    role
  }
}

const registerExisting = async ({ id, name, email, passwordHash }) => {
  const role = 'user'
  const res = await query('UPDATE users SET (name, role, email, password) = ($2, $3, $4, $5) WHERE id = $1', [
    id,
    name,
    role,
    email,
    passwordHash
  ])
  if (res.rowCount !== 1) {
    throw new Error('register-existing-user-failed')
  }
  return {
    id,
    name,
    role
  }
}

export {
  register,
  registerExisting
}
