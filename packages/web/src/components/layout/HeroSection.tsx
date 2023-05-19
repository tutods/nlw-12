import Image from 'next/image';
import Link from 'next/link';

export const HeroSection = () => (
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
        Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
        com o mundo!
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
);
