import fastify from 'fastify'
import cors from '@fastify/cors'
import { baseRoutes, memoriesRoutes, usersRoutes } from '@/routes'

const app = fastify()

app
  // CORS
  .register(cors, {
    origin: true,
  })
  // initialGET route
  .register(baseRoutes)
  // Users routes
  .register(usersRoutes)
  // Memories routes
  .register(memoriesRoutes)
  // Port
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Server running on http://127.0.0.1:3333')
  })
