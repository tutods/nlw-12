import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { NewMemoryForm } from '@/components/memories/new/Form';

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

      <NewMemoryForm />
    </main>
  );
}
