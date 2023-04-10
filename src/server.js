import express from 'express'
import { router } from './api/poke-router.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { mongoConfig } from './database/mongoConfig.js'

const app = express()
const port = 5000

mongoConfig()

app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use('/pokemon', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
