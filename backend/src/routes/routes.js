import { getTarefas, createTarefa } from '../repository/repository.js';
import { parseBool } from '../utils/utils.js';

export default async function tarefasRoutes (fastify, options) {

    fastify.get('/tarefas', (request, reply) => {
        const queryParams = {
            user: request.query.user,
            ignoreChecked: request.query.ignoreChecked ? parseBool(request.query.ignoreChecked) : false,
            ignoreNoAtive: request.query.ignoreNoAtive ? parseBool(request.query.ignoreNoAtive) : false,
        }

        getTarefas(queryParams, function(err, result) {
            if (err) { 
                fastify.log.error(err);
                return reply.status(500).send({ error: 'Erro ao buscar tarefas.' });
            }
            return reply.status(200).send(result)
        })
    });

    fastify.post('/tarefas', (request, reply) => {
        const tarefaData = request.body;
        
        createTarefa(tarefaData, function(err, result) {
            if (err) { 
                fastify.log.error(err);
                return reply.status(500).send({ error: 'Erro ao criar tarefa.' });
            }
            return reply.status(201).send({ id_tarefa: result.codigo })
        })
    })
}