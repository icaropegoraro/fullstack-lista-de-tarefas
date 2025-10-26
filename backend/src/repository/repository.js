import { executeQuery } from '../config/database.js';

export const getTarefasWithFilters = (queryParams, callback) => {
    let sql = `select t.*
               from tarefas t
               where 1 = 1
              `

    let filtro = []

    if (queryParams.user) {
        sql += ' and t.cod_usuario = ?';
        filtro.push(queryParams.user)
    }

    if (queryParams.ignoreChecked) {
        if (queryParams.ignoreChecked) {
            sql += ' and t.idf_check = ?';
            filtro.push('N')
        }
    }

    if (queryParams.ignoreNoAtive) {
        if (queryParams.ignoreNoAtive) {
            sql += ' and t.idf_ativo = ?';
            filtro.push('S')
        }
    }
    
    executeQuery(sql, filtro, callback)
}

export const insertTarefa = (tarefaData, callback) => {
    const sql = `insert
                  into tarefas (
                       cod_usuario,
                       tarefa,
                       idf_ativo,
                       idf_check,
                       criado_em
             ) values (?, ?, 'S', 'N', current_timestamp)
             returning codigo`;
    
    const filtro = [tarefaData.cod_usuario, tarefaData.tarefa];
    
    executeQuery(sql, filtro, callback);
}

export const updateTarefa = (queryParams, callback) => {
    const setClauses = [];
    const params = [];
    const codigoTarefa = queryParams.cod_tarefa;

    if (!codigoTarefa) {
        return callback(new Error("cod_tarefa is required for update"));
    }

    for (const coluna in queryParams) {
        if (coluna === 'cod_tarefa') continue;
        setClauses.push(`${coluna} = ?`);
        params.push(queryParams[coluna]);
    }

    params.push(codigoTarefa);

    const sql = `update tarefas 
                    set ${setClauses.join(', ')} 
                  where codigo = ?`;

    executeQuery(sql, params, callback);
}
