import { FastifyInstance } from 'fastify';

export async function baseRoutes(app: FastifyInstance) {
  app.get('/', (_, reply) => {
    return reply.code(200).send({
      status: 'ok',
    });
  });
}

// Export other routes files
export * from '@/routes/auth.routes';
export * from '@/routes/memories.routes';
export * from '@/routes/upload.routes';
export * from '@/routes/users.routes';
