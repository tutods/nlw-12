import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { MemoryFormHeader } from '@/components/memories/new/FormHeader';

export default function NewMemory() {
  return (
    <main className="flex flex-1 flex-col gap-4">
      <Link
        passHref
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        href="/"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

      <form className="flex flex-1 flex-col gap-2">
        <MemoryFormHeader />

        <textarea
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          id="content"
          name="content"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          spellCheck={false}
        />
      </form>
    </main>
  );
}
