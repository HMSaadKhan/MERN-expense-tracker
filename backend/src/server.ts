require('dotenv').config()

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import router from './router'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
