import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import clsx from 'clsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx([inter.className, 'h-screen bg-zinc-950'])}>
        {children}
      </body>
    </html>
  )
}