import { executeQuery } from '../config/database.js';

export const getTarefas = (queryParams, callback) => {
    let sql = `select t.*
                 from tarefas t
                where 1 = 1
              `

    let filtro = []

    if (queryParams.user) {
        sql += 'and t.cod_usuario = ?';
        filtro.push(queryParams.user)
    }

    if (queryParams.ignoreChecked) {
        sql += 'and t.idf_check = ?';
        filtro.push('N')
    }

    if (queryParams.ignoreNoAtive) {
        sql += 'and t.idf_ativo = ?';
        filtro.push('S')
    }
    
    executeQuery(sql, filtro, callback)
}

export const createTarefa = (tarefaData, callback) => {
    let sql = `insert
                into tarefas (
                    cod_usuario,
                    tarefa,
                    idf_ativo,
                    idf_check,
                    criado_em
                ) values (?, ?, 'S', 'N', current_timestamp)
                returning codigo`

    let filtro = [tarefaData.cod_usuario, tarefaData.tarefa]

    executeQuery(sql, filtro, callback)
}