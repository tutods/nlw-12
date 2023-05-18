import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(/assets/bg-stars.svg)] bg-cover px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        {/* Stripes */}
        <div className="absolute inset-y-0 right-2 w-2 bg-stripes" />

        {/* Sign In */}
        <Link
          passHref
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
          href="#"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="h-5 w-5 text-gray-500" />
          </div>

          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline">Crie sua conta</span> e salve suas
            memórias
          </p>
        </Link>

        {/* Hero */}
        <div className="space-y-5">
          <Image
            alt="NLW Spacetime"
            height={48}
            src="/assets/nlw-spacetime.svg"
            width={160}
          />

          <div className="w-full max-w-[420px] space-y-1">
            <h1 className="text-5xl font-bold leading-tight  text-gray-50">
              Sua cápsula do tempo
            </h1>
            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>

          <Link
            passHref
            className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
            href="#"
          >
            Cadastrar lembrança
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da{' '}
          <a
            className="underline transition-colors hover:text-gray-100"
            href="https://rocketseat.com.br"
            rel="noreferrer"
            target="_blank"
          >
            Rocketseat
          </a>
        </footer>
      </section>

      <section className="flex flex-col bg-[url(/assets/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-full max-w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, come a{' '}
            <Link
              passHref
              className="underline transition-colors duration-150 ease-in-out hover:text-gray-50"
              href="#"
            >
              criar agora
            </Link>
            !
          </p>
        </div>
      </section>
    </main>
  );
}
