// components/Layout.js
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const isHome = pathname === '/';

  return (
    <>
      <Header transparent={isHome} />

      {/* Apply noPadding on home, otherwise default .main */}
      <main className={isHome ? 'main noPadding' : 'main'}>
        {children}
      </main>

      <Footer />

      {/* styled-JSX for all layout CSS */}
      <style jsx>{`
        .main {
          background-color: #fff;
          width: 100%;
          min-height: 100vh;
          margin: 0 auto;
          overflow-x: hidden;
          /* desktop header height */
          padding-top: 80px;
          font-family: Pacifico, cursive;
        }
        /* mobile header height adjustment */
        @media (max-width: 768px) {
          .main {
            padding-top: 60px;
          }
        }
        /* kill top padding on home so hero sits flush under transparent header */
        .noPadding {
          padding-top: 0 !important;
        }
      `}</style>
    </>
  );
}
