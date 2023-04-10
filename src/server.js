import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import { pokeRouter } from './api/routes/poke-route.js'
import { authRouter } from './api/routes/auth-route.js'
import { mongoConfig } from './database/mongoConfig.js'

const app = express()
const port = 5000
config()
mongoConfig()

app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use('/pokemon', pokeRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
