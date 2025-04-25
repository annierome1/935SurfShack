// components/Layout.js
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        {/* Load Pacifico + Lobster Two */}
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Lobster+Two&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      <main style={mainStyle}>
        {children}
      </main>

      <Footer />
    </>
  )
}

const mainStyle = {
  backgroundColor: '#fff',
  width: '100%',
  minHeight: '100vh',
  margin: '0 auto',
  fontFamily: "'Pacifico', 'Lobster Two', cursive",  // now both are available
  overflowX: 'hidden'
}
