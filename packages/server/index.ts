import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

import { startApp } from './orm'
import topicRouter from './orm/routes/topicRoutes/topicRoutes'
const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

startApp()

app.use(express.json())
app.use('/topic', topicRouter)

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
