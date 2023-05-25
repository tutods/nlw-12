import { FastifyInstance } from 'fastify';

import { uploadFile } from '@/services/upload.service';

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', uploadFile);
}
