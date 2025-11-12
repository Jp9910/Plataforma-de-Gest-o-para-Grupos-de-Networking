import pg from 'pg'
import "dotenv/config"
const { Pool } = pg

let pool;
if (process.env.DATABASE_CONNECTION_STRING) {
    pool = new Pool({ connectionString: process.env.DATABASE_CONNECTION_STRING })
} else {
    pool = new Pool({
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT || 5432,
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || 'postgres',
        database: process.env.PG_DATABASE || 'postgres',
    })
}


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

// testar o BD
//console.log(await pool.query('SELECT NOW()'))

export default pool