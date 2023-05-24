import Image from 'next/image';
import Link from 'next/link';

import { getUser } from '@/lib/auth';

export const Profile = () => {
  const { name, avatarUrl } = getUser();

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        alt={name}
        className="h-10 w-10 rounded-full"
        height={40}
        src={avatarUrl}
        width={40}
      />

      <p className="max-w-[140px] leading-snug text-gray-50">
        {name}{' '}
        <Link
          className="block text-sm text-red-400 transition-colors hover:text-red-300"
          href="/api/auth/logout"
        >
          Quero sair
        </Link>
      </p>
    </div>
  );
};
