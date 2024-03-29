import './globals.css'
import { Inter } from 'next/font/google'
import ThemeProvider from '@/components/themeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IsWeb?',
  description: 'Generated by create next app',
}

interface RootLayProps {
    children: React.ReactNode 
}

export default function RootLayout({ children, }: RootLayProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <ThemeProvider attribute='class'>
                {children}
            </ThemeProvider>
      </body>
    </html>
  )
}
