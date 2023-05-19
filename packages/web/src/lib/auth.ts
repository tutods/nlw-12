import jwtDecode from 'jwt-decode';
import { cookies } from 'next/headers';

type User = {
  sub: string;
  name: string;
  avatarUrl: string;
};

export const getUser = (): User => {
  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('Unathenticated!');
  }

  return jwtDecode<User>(token);
};
