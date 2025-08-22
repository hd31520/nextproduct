// src/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import AuthProvider from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Product Management App',
  description: 'Manage your products with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <Toaster position="top-right" />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}