import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'
import { paramsSchema } from '@/schemas/params.schema'
import { createMemorySchema } from '@/schemas/memory.schema'

const getMemories = async (request: FastifyRequest, reply: FastifyReply) => {
  const memories = await prisma.memory.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  })

  return reply.status(200).send(
    memories.map(({ content, ...memory }) => ({
      ...memory,
      excerpt: content.substring(0, 115).concat('...'),
    })),
  )
}

const getMemory = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return reply.status(200).send(memory)
  } catch (error) {
    console.error(error)

    return reply.status(400).send({ payload: error })
  }
}

const createMemory = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { content, isPublic, coverUrl } = createMemorySchema.parse(
      request.body,
    )

    const memory = await prisma.memory.create({
      data: {
        userId: 'e0f38b0d-0f29-4274-8c13-ebd0a093a47f',
        content,
        coverUrl,
        isPublic,
      },
    })

    return reply.status(201).send({
      message: 'Memory successfully created',
      memory,
    })
  } catch (error) {
    console.error(error)

    return reply.status(400).send({ payload: error })
  }
}

const updateMemory = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { content, isPublic, coverUrl } = createMemorySchema.parse(
      request.body,
    )
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return reply.status(201).send({
      message: 'Memory successfully updated',
      memory,
    })
  } catch (error) {
    console.error(error)

    return reply.status(400).send({ payload: error })
  }
}

const deleteMemory = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })

    return reply.status(204).send()
  } catch (error) {
    console.error(error)

    return reply.status(400).send({ payload: error })
  }
}

export { getMemories, getMemory, createMemory, updateMemory, deleteMemory }
