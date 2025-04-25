// pages/_app.js
import '../styles/global.css'
import { Lobster_Two, Pacifico } from 'next/font/google'

const lobster = Lobster_Two({ subsets: ['latin'], weight: ['400'] })
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] })

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${lobster.className} ${pacifico.className}`}>
      <Component {...pageProps} />
    </main>
  )
}
