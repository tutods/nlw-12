import { FastifyInstance } from 'fastify'
import { getUsers } from '@/services/users.service'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', getUsers)
}
