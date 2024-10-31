import { Providers } from './providers'
import './globals.css'
import NavBar from '../components/NavBar'
import { useTheme } from '../hooks/useTheme'

export const metadata = {
  title: 'StudyApp',
  description: 'App to study terms',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { theme } = useTheme()
  return (
    <html lang="en" className={theme}>
      <body>
        <Providers>
          <main className="min-h-screen">
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
