export default ({ name, email, password }) => {
  const error = new Error('invalid-registr-fields')
  const details = []
  if (!name || name.length === 0) {
    details.push('No name provided')
  }
  if (!email || email.length === 0) {
    details.push('Email field is required')
  } else if (!email.match(/.+@.+/)) {
    details.push('Invalid email')
  }
  if (!password || password.length < 6) {
    details.push('Password has to be at least 6 characters long')
  }
  if (details.length > 0) {
    error.details = { details }
    throw error
  }
}
