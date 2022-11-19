import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import { pool } from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.urlencoded()).use(express.json()).use(cors())

app.get('/', (_req, res) => {
  res.send("Try with '/users' or '/stores' !")
})

app.get('/users', async (_req, res) => {
  const [result] = await pool.query('select * from users')
  res.json(result)
})

app.get('/stores', async (_req, res) => {
  const [result] = await pool.query('select * from stores')
  res.json(result)
})

app.get('/ping', async (_req, res) => {
  const [result] = await pool.query(`select "hello world" as result`)
  res.send(result[0])
})

app.get('/products', async (_req, res) => {
  const [result] = await pool.query('select * from products')
  res.json(result)
})

app.post('/products', async (req, res) => {
  const { name, photoUrl, description } = req.body
  if (name && photoUrl && description) {
    const [result] = await pool.query(`
    INSERT INTO products (name, photoUrl, description)
    values("${name}", "${photoUrl}", "${description}");`)
    res.send(result)
  } else res.status(500).send('missing required parameters')
})

app.listen(PORT, () =>
  console.log('---\n\nServer listening on PORT ' + PORT + '\n\n---'),
)
