import '../styles/global.css'
import { Lobster_Two, Pacifico } from 'next/font/google'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { AnimatePresence, motion } from 'framer-motion'
import ReviewsWidget from '../components/ReviewsWidget'
import PrivacyBanner from "../components/PrivacyBanner"

const lobster = Lobster_Two({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lobster',
})
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
})

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration
      window.history.scrollRestoration = 'manual'
      return () => { window.history.scrollRestoration = prev }
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag && GA_ID) {
        window.gtag('config', GA_ID, { page_path: url })
      }
      if (!url.includes('#')) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <link rel="icon" href="/Logo_transparent.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="935 Surf Shack — North Beach's newest beach bar at 935 Ocean Boulevard, Hampton NH. Live music, fresh lobster rolls, craft cocktails & local brews." />
        <meta property="og:title" content="935 Surf Shack" />
        <meta property="og:description" content="North Beach's newest beach bar. Live music, fresh lobster rolls, craft cocktails & local brews." />
        <meta property="og:type" content="website" />
      </Head>

      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      <div className={`${lobster.variable} ${pacifico.variable}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <ReviewsWidget />
        <PrivacyBanner />
      </div>
    </>
  )
}
