import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import { pool } from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded()).use(express.json()).use(cors())

app.get('/', async (req, res) => {
  const [result] = await pool.query('select * from users')
  res.json(result)
})

app.get('/stores', async (req, res) => {
  const [result] = await pool.query('select * from stores')
  res.json(result)
})

app.get('/ping', async (req, res) => {
  const [result] = await pool.query(`select "hello world" as result`)
  res.send(result[0])
})

app.get('/create', async (req, res) => {
  const result = await pool.query('INSERT INTO users(name) VALUES ("John")')
  res.json(result)
})

app.listen(PORT, () =>
  console.log('---\n\nServer listening on PORT ' + PORT + '\n\n---'),
)
