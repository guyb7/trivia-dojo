const notFound = (req, res) => {
  parseError(res, new Error('no-such-route'))
}

const serverError = (err, req, res, next) => {
  parseError(res, err)
}

const errors = {
  'no-such-route': {
    code: 404,
    id: 10,
    message: 'No such route'
  },
  'user-not-found': {
    code: 400,
    id: 11,
    message: 'No such user'
  }
}

const parseError = (res, err) => {
  if (errors[err.message]) {
    res.status(errors[err.message].code).json({
      success: false,
      error: {
        id: errors[err.message].id,
        message: errors[err.message].message
      }
    })
  } else {
    console.error('Unhandled error')
    console.error(err.stack)
    res.status(500).json({
      success: false,
      error: {
        id: 10,
        message: 'Server side error'
      }
    })
  }
}

export {
  notFound,
  serverError,
  parseError
}
