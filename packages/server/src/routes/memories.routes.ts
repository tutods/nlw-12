import { FastifyInstance } from 'fastify';
import {
  createMemory,
  deleteMemory,
  getMemories,
  getMemory,
  updateMemory,
} from '@/services/memories.service';

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => await request.jwtVerify());

  app.get('/', getMemories);

  app.get('/:id', getMemory);

  app.post('/', createMemory);

  app.put('/:id', updateMemory);

  app.delete('/:id', deleteMemory);
}
