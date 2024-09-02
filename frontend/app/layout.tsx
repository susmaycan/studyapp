import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'
import NavBar from '../components/NavBar'

export const metadata: Metadata = {
  title: 'StudyApp',
  description: 'App to study terms',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className=" min-h-screen ">
            <NavBar />
            <div className="flex flex-col items-center justify-between p-10">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
