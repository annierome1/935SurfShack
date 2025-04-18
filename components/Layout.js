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
  backgroundColor: '#fff', // set your desired background color
  width: '100%',             // full width of the viewport
  minHeight: '100vh',        // ensure it covers the full viewport height
  margin: '0 auto',  
  fontFamily: 'Pacifico, cursive', 
  overflowX: 'hidden'       
};
