import * as tarefasService from '../services/services.js';
import { parseBool } from '../utils/utils.js';

export const listTarefas = (request, reply) => {

    const queryParams = {
        user: request.query.user,
        ignoreChecked: request.query.ignoreChecked ? parseBool(request.query.ignoreChecked) : false,
        ignoreNoAtive: request.query.ignoreNoAtive ? parseBool(request.query.ignoreNoAtive) : false,
    }

    tarefasService.getTarefas(queryParams, function(err, result) {
        if (err) { 
            request.log.error(err); 
            return reply.status(500).send({ error: 'Erro ao buscar tarefas.' });
        }
        return reply.status(200).send(result)
    })
}

export const insertNewTarefa = (request, reply) => {

    const tarefaData = request.body;

    tarefasService.createTarefa(tarefaData, function(err, result) {
        if (err) { 
            request.log.error(err); 
            return reply.status(500).send({ error: 'Erro ao criar tarefa.' });
        }
        return reply.status(201).send({ id_tarefa: result.codigo })
    })
}

export const updateTarefa = (request, reply) => {
    const queryParams = request.body;

    tarefasService.setTarefa(queryParams, function(err, result) {
        if (err) {
            request.log.error(err);
            return reply.status(500).send({error: "Erro ao atualizar tarefa."});
        }
        return reply.status(204).send({message: "Tarefa atualizada com sucesso."})
    })
}