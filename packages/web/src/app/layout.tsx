import clsx from 'clsx';
import {
  Bai_Jamjuree as BaiJamjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google';
import { ReactNode } from 'react';

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
    template: '%s | NLW Spacetime',
  },
  description:
    'Uma cápsula do tempo construída com REact, Next.js, Tailwind CSS e TypeScript.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body
        className={clsx([
          roboto.variable,
          baiJamjuree.variable,
          'min-h-screen bg-gray-900 font-sans text-gray-100',
        ])}
      >
        {children}
      </body>
    </html>
  );
}
