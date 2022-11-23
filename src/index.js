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

app.get('/stores/:id', async (req, res) => {
  const [result] = await pool.query(
    'select * from stores where id = ' + req.params.id,
  )
  res.json(result)
})

app.put('/stores', async (req, res) => {
  const store = req.body
  const [result] = await pool.query(`UPDATE stores SET 
  name = "${store.name}",
  address = "${store.address}",
  ${store.phone && `phone = "${store.phone}",`}
  ${store.coordenates && `coordenates = "${store.coordenates}",`} 
  loc = "${store.loc}",
  type = "${store.type}",
  state = "${store.state}",
  ${store.brand && `brand = "${store.brand}"`}
  WHERE id = ${store.id}
  `)
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
