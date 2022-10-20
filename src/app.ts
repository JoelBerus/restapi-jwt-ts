import express, { Application } from 'express'
import routes from './routes/auth/index'

const app: Application = express()

// settings

app.set('port', 3000)
// app.set('port', process.env.PORT || 3000);

// middleware
// app.use(morgan('dev'));
app.use(express.json())

// router routes
app.use('/api/auth', routes)

export default app
