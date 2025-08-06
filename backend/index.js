const express = require('express')
require('dotenv').config()
const taskRoutes = require('./routes/taskRoutes')
const authRoutes = require('./routes/authRoutes')
const getConnection = require('./database/connection')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API está funcionando 🎉')
})

app.get('/ping', (req, res) => {
  res.json({ message: 'pong 🏓' })
})

app.get('tarefas', (req, res) => {
  res.json
})

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando bb')
})

/*app.use(express.json())

app.use('/login')

getConnection((err, db) => {
  if (err) {
    console.log('❌ Falha ao conectar com o banco.')
  } else {
    console.log('✅ Conexão com Firebird funcionando.')
    db.detach()
  }
})*/