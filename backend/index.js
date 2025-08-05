const Firebird = require('node-firebird')

const options = {
  host: 'localhost',
  port: 3050,
  database: 'C:\\VSCode\\fullstack-lista-de-tarefas\\LISTA-DE-TAREFAS.FDB',
  user: 'sysdba',
  password: 'masterkey'  
}

Firebird.attach(options, function(err, db) {
  if (err) throw err

  console.info('Conectado ao banco de dados Firebird!')

  db.query('SELECT * FROM tarefas', function(err, result) {
    if (err) throw err

    console.log(result)

    db.detach()
  })
})