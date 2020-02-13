const Pool = require('pg').Pool;

const db = new Pool({
    host: 'postgres-wishlist',
    port: 5432,
    database: 'wishlist',
    user: 'postgres',
    password: 'luiza@123'
})

module.exports = db;