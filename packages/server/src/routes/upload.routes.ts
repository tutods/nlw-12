import { FastifyInstance } from 'fastify';
import {
  createMemory,
  deleteMemory,
  getMemories,
  getMemory,
  updateMemory,
} from '@/services/memories.service';
import { uploadFile } from '@/services/upload.service';

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', uploadFile);
}
