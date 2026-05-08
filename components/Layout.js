// components/Layout.js
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import styles from '../styles/components/layout.module.css';

export default function Layout({ children }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  const wrapperClass = [
    styles.siteWrapper,
    isHomePage ? styles.siteWrapperHome : styles.siteWrapperInner,
  ].join(' ');

  return (
    <>
      <Header />
      <div className={wrapperClass}>{children}</div>
      <Footer />
    </>
  );
}
