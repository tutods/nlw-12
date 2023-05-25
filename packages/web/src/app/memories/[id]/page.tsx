import dayjs from 'dayjs';
import { ChevronLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '@/lib/api';
import { Memory } from '@/types/Memory';
import { getFileType } from '@/utils/getFileType';

export default async function MemoryDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const token = cookies().get('token')?.value;

  const { data: memory } = await api.get<Memory>(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!memory) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-16">
        <svg
          className="h-8 w-8 animate-spin text-white"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-16">
      <Link
        passHref
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        href="/"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

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
          alt="Memory cover"
          className="aspect-video w-full rounded-lg object-cover"
          height={280}
          src={memory.coverUrl}
          width={592}
        />
      )}
      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>
    </main>
  );
}
