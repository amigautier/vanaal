import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './styles.css'

export const metadata = {
  description: 'Revista de moda local, belleza, marcas y festivales.',
  title: 'Vanaal Magazine',
  icons: {
    icon: './favicon.ico',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
