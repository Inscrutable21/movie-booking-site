import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import '@fortawesome/fontawesome-free/css/all.min.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie Booking Website',
  description: 'Book your favorite movies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}