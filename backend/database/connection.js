require('dotenv').config()
const firebird = require('firebird')


const options = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

function getConnection(callback) {
    console.log('[DEBUG] Conectando com config:');
    console.log({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    firebird.attach(options, (err, db) => {
        if (err) {
            console.error('Erro ao conectar com Firebird:', err)
            return callback(err, null)
        }
        callback(null, db)
    })
}

module.exports = getConnection