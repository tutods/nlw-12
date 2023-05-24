import 'dotenv/config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { join } from 'node:path';
import {
  baseRoutes,
  memoriesRoutes,
  usersRoutes,
  authRoutes,
  uploadRoutes,
} from '@/routes';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import staticFiles from '@fastify/static';

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
  // Serve Static Files
  .register(staticFiles, {
    root: join(__dirname, '../public'),
    prefix: '/',
  })
  // Multipart
  .register(multipart)
  // initial GET route
  .register(baseRoutes)
  // Auth routes
  .register(authRoutes)
  // Upload routes
  .register(uploadRoutes)
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
