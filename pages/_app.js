import '../styles/global.css'
import { Lobster_Two, Pacifico } from 'next/font/google'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ReviewsWidget from '../components/ReviewsWidget'
import PrivacyBanner from "../components/PrivacyBanner";

const lobster = Lobster_Two({ subsets: ['latin'], weight: ['400'] })
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] })

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // Prevent browser from restoring scroll on history navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration
      window.history.scrollRestoration = 'manual'
      return () => { window.history.scrollRestoration = prev }
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Google Analytics pageview
      if (window.gtag && GA_ID) {
        window.gtag('config', GA_ID, { page_path: url })
      }
      // Start at top for new pages; preserve in-page anchor jumps
      if (!url.includes('#')) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) // use 'smooth' if you prefer
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      {GA_ID && (
        <>
          <Head>
            <link rel="icon" href="/Logo_transparent.png" />
          </Head>
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
      <main className={`${lobster.className} ${pacifico.className}`}>
        <Component {...pageProps} />
        <ReviewsWidget />
        <PrivacyBanner />
      </main>
    </>
  )
}
