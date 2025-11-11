import pg from 'pg'
import "dotenv/config"
const { Pool } = pg
 
// console.log(process.env.PG_USER)
// console.log(process.env.PG_PASSWORD)
// console.log(process.env.PG_HOST)
// console.log(process.env.PG_PORT)
// console.log(process.env.PG_DATABASE)

const pool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'postgres',
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
 
// testar o BD
//console.log(await pool.query('SELECT NOW()'))

export default pool