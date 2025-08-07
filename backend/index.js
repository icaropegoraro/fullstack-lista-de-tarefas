import express from 'express'
import  cors  from 'cors'
import { taskRoutes } from './routes/taskRoutes.js'
import { authRoutes } from './routes/authRoutes.js'
import { getConnection } from './database/connection.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

/*app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API está funcionando')
})

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

app.get('tarefas', (req, res) => {
  res.json
})

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando bb')
})*/

app.use(cors())

app.use(express.json())

app.post('/login', (req, res) => {
  const {email, senha} = req.body 

  

  getConnection((err, db) => {

    const queryUser = `select u.codigo, u.email, u.senha, u.idf_ativo from usuarios where u.email = ?`

    db.query(queryUser, [email], (err, result) => {
    if (err) {
      db.detach()
      return res.json({message: 'Erro ao consultar os usuários'})
    }

    if (result.length === 0) {
      db.detach()
      return res.json({message: 'Nenhum usuário encontrado'})
    }

    const userQuery = result[0]

    if (senha !== userQuery.senha) {
      db.detach()
      return res.json({message: 'Senha incorreta. Tente novamente.'})
    }

    db.detach()
    res.json({message: "Login realizado com sucesso."})
  })
  })

  

})

app.listen(process.env.PORT, () => {
  console.log('Servidor rodando bb')
})