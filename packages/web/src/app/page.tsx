import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-full max-w-[360px] text-center leading-relaxed">
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
    </div>
  );
}
