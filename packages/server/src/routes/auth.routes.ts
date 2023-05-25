import { FastifyInstance } from 'fastify';

import { registerUser } from '@/services/auth.service';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', registerUser);
}
