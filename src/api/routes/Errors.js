const notFound = (req, res) => {
  parseError(res, new Error('no-such-route'))
}

const serverError = (err, req, res, next) => {
  parseError(res, err)
}

const errors = {
  'unhandled-error': {
    id: 10,
    code: 500,
    message: 'Server side error'
  },
  'no-such-route': {
    id: 11,
    code: 404,
    message: 'No such route'
  },
  'user-not-found': {
    id: 12,
    code: 400,
    message: 'No such user'
  },
  'register-user-failed': {
    id: 13,
    code: 500,
    message: 'Failed to register the user'
  },
  'register-existing-user-failed': {
    id: 14,
    code: 500,
    message: 'Failed to register the user'
  },
  'no-user-id-in-session': {
    id: 15,
    code: 500,
    message: 'Failed to register, no user found'
  },
  'invalid-registr-fields': {
    id: 16,
    code: 400,
    message: 'Invalid registration fields'
  },
  'email-in-use': {
    id: 17,
    code: 400,
    message: 'Email already in use'
  }
}

const parseError = (res, err) => {
  const error = errors[err.message] || errors['unhandled-error']
  if (error.code >= 500) {
    console.error(err.stack)
  }
  res.status(error.code).json({
    success: false,
    error: {
      id: error.id,
      message: error.message,
      ...err.details
    }
  })
}

export {
  notFound,
  serverError,
  parseError
}
