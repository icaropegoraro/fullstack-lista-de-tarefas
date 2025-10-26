import Fastify from 'fastify';
import cors from '@fastify/cors';
import tarefasRoutes from './routes/routes.js';

const fastify = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            }
        }
    }
});

fastify.register(cors);

fastify.get('/', async (request, reply) => {
    return { message: "Conectado a API com sucesso." };
});

fastify.register(tarefasRoutes);

const start = async (req, err) => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        fastify.log.info(`Servidor rodando em http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();