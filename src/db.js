import { createPool } from 'mysql2/promise'

export const pool = createPool({
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Juanfies2?',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  database: process.env.DB_DATABASE || 'usersdb',
})
