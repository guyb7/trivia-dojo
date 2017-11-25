import _has from 'lodash/has'

export default error => {
  let errorMessage = 'Something went wrong'
  if (error.response) {
    if (_has(error, 'response.data.error.message')) {
      errorMessage = error.response.data.error.message
    }
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    console.log('Server error', error.request)
  } else {
    console.log('Client error', error.message)
  }
  console.log(error.config)
  return errorMessage
}
