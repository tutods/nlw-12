import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const {
    data: { token },
  } = await api.post('/register', { code });

  const redirectTo = request.cookies.get('redirectTo')?.value;
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30; // 30 days

  if (redirectTo) {
    const res = new Response();
    res.headers.append(
      'Set-Cookie',
      `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    );
    res.headers.append(
      'Set-Cookie',
      `redirectTo=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
    );

    return NextResponse.redirect(redirectTo, {
      headers: res.headers,
    });
  }

  return NextResponse.redirect(new URL('/', request.url), {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  });
}
