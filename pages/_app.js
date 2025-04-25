// pages/_app.js
import { Lobster_Two } from '@next/font/google'
const lobster = Lobster_Two({ subsets: ['latin'], weight: ['400'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={lobster.className}>
      <Component {...pageProps} />
    </main>
  )
}
