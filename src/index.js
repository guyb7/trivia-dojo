import app from './api/'
import http from 'http'

const server = http.createServer(app)
server.listen(process.env.PORT || 3000)

if (module.hot) {
  let currentApp = app
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./api', () => {
    console.log('🔁  HMR Reloading `/src/api/`...')
    server.removeListener('request', currentApp)
    currentApp = require('./api/').default
    server.on('request', currentApp)
  })
}
