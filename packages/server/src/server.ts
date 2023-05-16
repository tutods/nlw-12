import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

app
  .get('/', (_, res) => {
    return res.code(200).send({
      status: 'ok',
    })
  })
  .get('/users', async (_, res) => {
    const users = await prisma.user.findMany()

    return res.code(200).send(users)
  })

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Server running on http://127.0.0.1:3333')
  })
