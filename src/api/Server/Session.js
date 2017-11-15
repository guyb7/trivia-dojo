import session from 'express-session'
import uuid from 'uuid/v4'

// import ConnectRedis from 'connect-redis'
// import RedisClient from './DB'

// const RedisStore = require('connect-redis')(session)

// const store = RedisClient ? new RedisStore({
//   client: RedisClient
// }) : new session.MemoryStore()

const {
  RAZZLE_COOKIE_SECRET = 'defaultsecret',
  RAZZLE_SESSION_KEY = 'session',
  RAZZLE_COOKIE_DAYS_TOEXPIRE = 90
} = process.env

const sessionConfig = {
  // store,
  name: RAZZLE_SESSION_KEY,
  secret: RAZZLE_COOKIE_SECRET,
  cookie: { maxAge: Number(RAZZLE_COOKIE_DAYS_TOEXPIRE) * 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true,
  genid: req => uuid()
}

export default app => {
  app.use(session(sessionConfig))
}
