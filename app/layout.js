import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Next.js CRUD App',
  description: 'A beginner-friendly full-stack CRUD application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 