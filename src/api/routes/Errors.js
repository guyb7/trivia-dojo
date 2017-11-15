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
      message: error.message
    }
  })
}

export {
  notFound,
  serverError,
  parseError
}
