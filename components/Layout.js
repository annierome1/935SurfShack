// components/Layout.js
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  
  const isHomePage = router.pathname === '/';

  const mainStyle = {
    backgroundColor: '#fff',
    width: '100%',
    minHeight: '100vh',
    margin: '0 auto',
    fontFamily: 'Pacifico, cursive',
    overflowX: 'hidden',
    paddingTop: isHomePage ? '0' : '80px' // <-- Only add padding if NOT home
  };

  return (
    <>
      <Header />
      <main style={mainStyle}>{children}</main>
      <Footer />
    </>
  );
}
