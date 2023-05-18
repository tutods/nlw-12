import { FastifyInstance } from 'fastify'
import {
  createMemory,
  deleteMemory,
  getMemories,
  getMemory,
  updateMemory,
} from '@/services/memories.service'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', getMemories)

  app.get('/memories/:id', getMemory)

  app.post('/memories', createMemory)

  app.put('/memories/:id', updateMemory)

  app.delete('/memories/:id', deleteMemory)
}
