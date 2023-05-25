import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '@/lib/prisma';
import { registerUserSchema, userSchema } from '@/schemas/auth.schema';

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { code } = registerUserSchema.parse(request.body);

  try {
    const { data } = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          code,
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const { access_token } = data;
    const { data: userData } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = userSchema.parse(userData);
    let user = await prisma.user.findUnique({
      where: {
        githubId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
          login: userInfo.login,
        },
      });
    }

    const token = request.server.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '1d',
      },
    );

    return reply.status(200).send({ token });
  } catch (error) {
    console.error(error);
    return reply.status(400).send({ payload: error });
  }
};
