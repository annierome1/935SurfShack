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

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', GA_ID, {
          page_path: url,
        })
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
