import { randomUUID } from 'node:crypto';
import { extname, resolve } from 'node:path';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { FastifyReply, FastifyRequest } from 'fastify';

const pump = promisify(pipeline);

const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/;

export const uploadFile = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const upload = await request.file({
    limits: {
      fileSize: 5 * 1048576, // 5MB
    },
  });

  if (!upload) {
    return reply.code(400).send();
  }

  if (!mimeTypeRegex.test(upload.mimetype)) {
    return reply.code(400).send({
      error: 'Please select a valid image or video file.',
    });
  }

  const fileId = randomUUID();
  const extension = extname(upload.filename);
  const fileName = fileId.concat(extension);

  const writeStream = createWriteStream(
    resolve(__dirname, '../../public/uploads/', fileName),
  );

  await pump(upload.file, writeStream);

  const fullUrl = request.protocol.concat('://').concat(request.hostname);
  const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

  return reply.code(200).send({
    success: true,
    fileUrl,
  });
};
