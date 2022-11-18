import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
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

app.get('/populate', async (req, res) => {
  let scriptText = ''

  JSON.parse(fs.readFileSync('data.json', 'utf-8')).forEach((x) => {
    scriptText =
      scriptText +
      `\nINSERT INTO 
    stores(name, address${x.phone ? ', phone' : ''}${
        x.coordenates ? ', coordenates' : ''
      }, loc, type, state${x.brand ? ', brand' : ''})
    VALUES ("${x.name}", "${x.address}", ${x.phone ? `"${x.phone}", ` : ''}${
        x.coordenates ? `"${x.coordenates}", ` : ''
      }"${x.loc}", "${x.type}", "${x.state}"${
        x.brand ? `, "${x.brand}"` : ''
      });`
  })

  const [result] = await pool.query(scriptText)
  res.json(result)
})

app.listen(PORT, () =>
  console.log('---\n\nServer listening on PORT ' + PORT + '\n\n---'),
)
