import clsx from 'clsx';
import {
  Bai_Jamjuree as BaiJamjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google';
import { ReactNode } from 'react';

import { Footer, HeroSection, LoginButton } from '@/components/layout';

import '@/app/globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
});

const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
});

export const metadata = {
  title: {
    default: 'NLW Spacetime',
    template: '%s |  NLW Spacetime',
  },
  description:
    'Uma cápsula do tempo construída com React, Next.js, Tailwind CSS e TypeScript.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body
        className={clsx([
          roboto.variable,
          baiJamjuree.variable,
          'grid min-h-screen grid-cols-2 bg-gray-900 font-sans text-gray-100',
        ])}
      >
        <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(/assets/bg-stars.svg)] bg-cover px-28 py-16">
          {/* Blur */}
          <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

          {/* Stripes */}
          <div className="absolute inset-y-0 right-2 w-2 bg-stripes" />

          <LoginButton />
          <HeroSection />
          <Footer />
        </section>

        <section className="flex flex-col bg-[url(/assets/bg-stars.svg)] bg-cover p-16">
          {children}
        </section>
      </body>
    </html>
  );
}
