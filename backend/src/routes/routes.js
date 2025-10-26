import { listTarefas, insertNewTarefa, updateTarefa } from '../controllers/controller.js';

export default async function tarefasRoutes (fastify, options) {

    fastify.get('/tarefas', listTarefas);

    fastify.post('/tarefas', insertNewTarefa);

    fastify.put('/tarefas', updateTarefa);
}