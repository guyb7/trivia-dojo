import express from 'express'
import bodyParser from 'body-parser'

import mountRoutes from './routes/'
import mountSession from './Server/Session'

const app = express()

app.disable('x-powered-by')
app.use(bodyParser.json())
mountSession(app)

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
mountRoutes(app)

export default app
