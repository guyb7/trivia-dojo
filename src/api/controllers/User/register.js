import uuid from 'uuid/v4'

import { query } from '../../Server/DB'
import { addDefaultCategories } from '../Categories'
import safeFields from './safeFields'

const register = async ({ name, role, passwordHash = null, email = null }) => {
  const id = uuid()
  let res
  try {
    res = await query('INSERT INTO users (id, name, role, email, password) VALUES ($1, $2, $3, $4, $5)', [
      id,
      name,
      role,
      email,
      passwordHash
    ])
    await addDefaultCategories(id)
  } catch (e) {
    if (e.error === 'duplicate key value violates unique constraint "unique-emails"') {
      throw new Error('email-in-use')
    } else {
      throw e
    }
  }
  if (res.rowCount !== 1) {
    throw new Error('register-user-failed')
  }
  return safeFields({
    id,
    name,
    role
  })
}

const registerExisting = async ({ id, name, email, passwordHash }) => {
  const role = 'user'
  let res
  try {
      res = await query('UPDATE users SET (name, role, email, password) = ($2, $3, $4, $5) WHERE id = $1', [
      id,
      name,
      role,
      email,
      passwordHash
    ])
  } catch (e) {
    if (e.message === 'duplicate key value violates unique constraint "unique-emails"') {
      throw new Error('email-in-use')
    } else {
      throw e
    }
  }
  if (res.rowCount !== 1) {
    throw new Error('register-existing-user-failed')
  }
  return safeFields({
    id,
    name,
    role
  })
}

export {
  register,
  registerExisting
}
