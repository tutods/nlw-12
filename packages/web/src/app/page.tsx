import dayjs from 'dayjs';
import pt from 'dayjs/locale/pt';
import { ArrowRight } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { EmptyMemories } from '@/components/memories/EmptyMemories';
import { api } from '@/lib/api';
import { MemoryList } from '@/types/Memory';
import { getFileType } from '@/utils/getFileType';

dayjs.locale(pt);

export default async function Home() {
  const isAuthenticated = cookies().has('token');

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookies().get('token')?.value;
  const { data: memories } = await api.get<MemoryList[]>('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!memories.length) {
    return <EmptyMemories />;
  }

  return (
    <main className="flex flex-1 flex-col gap-10 p-9">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY ')}
          </time>
          {getFileType(memory.coverUrl) === 'video' ? (
            <video
              controls
              className="aspect-video h-[280px] w-full rounded-lg object-cover"
              src={memory.coverUrl}
            />
          ) : (
            <Image
              alt={memory.excerpt}
              className="aspect-video w-full rounded-lg object-cover"
              height={280}
              src={memory.coverUrl}
              width={592}
            />
          )}
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          <Link
            passHref
            className="flex items-center gap-2 text-sm text-gray-200 transition-colors ease-in-out hover:text-gray-100"
            href={`/memories/${memory.id}`}
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </main>
  );
}
