import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const redirectURL = new URL('/', request.url);

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
    },
  });
}
