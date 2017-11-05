import express from 'express'
import mountRoutes from './api/routes/'

const app = express()

app.disable('x-powered-by')
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

mountRoutes(app)

export default app
