import Pool from 'pg-pool'
import Promise from 'bluebird'

const pool = new Pool({
  host:     process.env.RAZZLE_PG_HOST,
  port:     process.env.RAZZLE_PG_PORT,
  user:     process.env.RAZZLE_PG_USER,
  password: process.env.RAZZLE_PG_PASSWORD,
  database: process.env.RAZZLE_PG_DB,
  max: 10,
  idleTimeoutMillis: 30000,
  Promise
})

pool.on('error',  (err, client) => {
  console.error('idle client error', err.message, err.stack)
})

const disconnect = async () => {
  await pool.end()
}

const query = async (query, params) => {
  return await pool.query(query, params)
}

export {
  pool,
  query,
  disconnect
}
