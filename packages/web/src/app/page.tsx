import { cookies } from 'next/headers';

import { EmptyMemories } from '@/components/memories/EmptyMemories';
import { api } from '@/lib/api';

export default async function Home() {
  const isAuthenticated = cookies().has('token');

  if (!isAuthenticated) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <EmptyMemories />
      </main>
    );
  }

  const token = cookies().get('token');
  const { data: memories } = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <main className="flex flex-1 items-center justify-center">
      {!memories.length ? (
        <EmptyMemories />
      ) : (
        <div className="flex flex-col gap-10 p-9"></div>
      )}
    </main>
  );
}
