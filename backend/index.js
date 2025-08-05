const getConnection = require('./database/connection');

getConnection((err, db) => {
  if (err) {
    console.log('❌ Falha ao conectar com o banco.');
  } else {
    console.log('✅ Conexão com Firebird funcionando.');
    db.detach()
  }
})