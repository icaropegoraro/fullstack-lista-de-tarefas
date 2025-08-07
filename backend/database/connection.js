import dotenv from 'dotenv'

dotenv.config()

import firebird from 'node-firebird'

const options = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}

export const getConnection = (callback) =>  {
    firebird.attach(options, (err, db) => {
        if (err) {
            console.error('Erro ao conectar com Firebird:', err)
            return callback(err, null)
        }
        callback(null, db)
    })
}