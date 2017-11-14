import session from 'express-session'
import uuid from 'uuid/v4'

// import ConnectRedis from 'connect-redis'
// import RedisClient from './DB'

// const RedisStore = require('connect-redis')(session)

// const store = RedisClient ? new RedisStore({
//   client: RedisClient
// }) : new session.MemoryStore()

const {
  COOKIE_SECRET = 'defaultsecret',
  REDIS_SESSION_KEY = 'session',
  COOKIE_DAYS_TOEXPIRE = 90
} = process.env

const sessionConfig = {
  // store,
  name: REDIS_SESSION_KEY,
  secret: COOKIE_SECRET,
  cookie: { maxAge: Number(COOKIE_DAYS_TOEXPIRE) * 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true,
  genid: req => {
    return uuid()
  }
}

export default app => {
  app.use(session(sessionConfig))
}
