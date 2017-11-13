import express from 'express'
import bodyParser from 'body-parser'

import mountRoutes from './routes/'

const app = express()

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

mountRoutes(app)

export default app
