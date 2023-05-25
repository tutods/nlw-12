import Link from 'next/link';

export const EmptyMemories = () => (
  <p className="w-full max-w-[360px] p-16 text-center leading-relaxed">
    Você ainda não registrou nenhuma lembrança, come a{' '}
    <Link
      passHref
      className="underline transition-colors duration-150 ease-in-out hover:text-gray-50"
      href="/memories/new"
    >
      criar agora
    </Link>
    !
  </p>
);
