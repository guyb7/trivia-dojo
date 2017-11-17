import uuid from 'uuid/v4'

import { query } from '../../Server/DB'

export default async ({ name, role, password = null, email = null }) => {
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
