// components/Footer.js
export default function Footer() {
    return (
      <footer style={footerStyle}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} Surf Shack. All Rights Reserved.</p>
        <p style={{ margin: 0 }}>123 Beachfront Ave, Ocean City, Example State</p>
      </footer>
    );
  }
  
  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem',
  };
  