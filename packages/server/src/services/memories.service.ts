import { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '@/lib/prisma';
import { createMemorySchema } from '@/schemas/memory.schema';
import { paramsSchema } from '@/schemas/params.schema';

export const getMemories = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { sub } = request.user;

  const memories = await prisma.memory.findMany({
    where: {
      userId: sub,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return reply.status(200).send(
    memories.map(({ content, ...memory }) => ({
      ...memory,
      excerpt: content.substring(0, 115).concat('...'),
    })),
  );
};

export const getMemory = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send();
    }

    return reply.status(200).send(memory);
  } catch (error) {
    console.error(error);

    return reply.status(400).send({ payload: error });
  }
};

export const createMemory = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { content, isPublic, coverUrl } = createMemorySchema.parse(
      request.body,
    );

    const memory = await prisma.memory.create({
      data: {
        userId: request.user.sub,
        content,
        coverUrl,
        isPublic,
      },
    });

    return reply.status(201).send({
      message: 'Memory successfully created',
      memory,
    });
  } catch (error) {
    console.error(error);

    return reply.status(400).send({ payload: error });
  }
};

export const updateMemory = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { content, isPublic, coverUrl } = createMemorySchema.parse(
      request.body,
    );
    const { id } = paramsSchema.parse(request.params);
    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send();
    }

    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });

    return reply.status(201).send({
      message: 'Memory successfully updated',
      memory,
    });
  } catch (error) {
    console.error(error);

    return reply.status(400).send({ payload: error });
  }
};

export const deleteMemory = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = paramsSchema.parse(request.params);

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    });

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send();
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    });

    return reply.status(204).send();
  } catch (error) {
    console.error(error);

    return reply.status(400).send({ payload: error });
  }
};
