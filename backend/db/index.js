const { Pool } = require('pg')
require('dotenv').config()
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.endPGPORT
})

module.exports = { 
    query: async (text, params) => {
        return await pool.query(text, params)
    }
}