import session from 'express-session'
import uuid from 'uuid/v4'
import ConnectPG from 'connect-pg-simple'
import { pool } from './DB'

const {
  RAZZLE_SESSION_TABLE = 'session',
  RAZZLE_COOKIE_SECRET = 'defaultsecret',
  RAZZLE_SESSION_KEY = 'session',
  RAZZLE_COOKIE_DAYS_TOEXPIRE = 90
} = process.env

const pgSession = ConnectPG(session)
const store = pool ? new pgSession({
  pool,
  tableName: RAZZLE_SESSION_TABLE
}) : new session.MemoryStore()

const sessionConfig = {
  store,
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
