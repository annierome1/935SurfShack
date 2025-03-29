// components/Layout.js
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={mainStyle}>{children}</main>
      <Footer />
    </>
  );
}

const mainStyle = {
  minHeight: '80vh',
  margin: '0 auto',
  maxWidth: '100%',
  
};
