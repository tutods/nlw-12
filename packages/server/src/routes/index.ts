import { FastifyInstance } from 'fastify'

export async function baseRoutes(app: FastifyInstance) {
  app.get('/', (_, reply) => {
    return reply.code(200).send({
      status: 'ok',
    })
  })
}

// Export other routes files
export * from '@/routes/memories'
export * from '@/routes/users'
