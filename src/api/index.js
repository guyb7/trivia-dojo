import express from 'express'
import bodyParser from 'body-parser'

import { mountAuth } from './Server/Auth'
import mountRoutes from './routes/'
import mountSession from './Server/Session'

const app = express()

app.disable('x-powered-by')
mountSession(app)
app.use(bodyParser.json())
mountAuth(app)

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
mountRoutes(app)

export default app
