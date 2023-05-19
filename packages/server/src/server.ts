import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { baseRoutes, memoriesRoutes, usersRoutes, authRoutes } from '@/routes';
import jwt from '@fastify/jwt';

const app = fastify();

app
  // CORS
  .register(cors, {
    origin: true,
  })
  // JWT
  .register(jwt, {
    secret: process.env.JWT_SECRET ?? 'nlw-spacetime',
  })
  // initial GET route
  .register(baseRoutes)
  // Auth routes
  .register(authRoutes)
  // Users routes
  .register(usersRoutes, { prefix: '/users' })
  // Memories routes
  .register(memoriesRoutes, { prefix: '/memories' })
  // Port
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Server running on http://127.0.0.1:3333');
  });
