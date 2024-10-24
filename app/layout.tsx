import './globals.css'
import type { Metadata } from 'next'
import {Inter, Poppins} from 'next/font/google'
import { ClerkProvider} from "@clerk/nextjs";
import {ToasterProvider} from "@/components/providers/toaster-provider";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'] // Add the desired font weights here
})

export const metadata: Metadata = {
  title: 'Soul Voices Hub',
  description: 'A video platform for the Soul Bilingue community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}>
      <ToasterProvider />
      {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
