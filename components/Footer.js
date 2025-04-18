import styles from "../styles/components/Footer.module.css";
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles['footer-section']} ${styles['logo-section']}`}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <a href="https://www.935ocean.com/" aria-label="Home">
      <img src="/inn_logo.png" alt="Surf Shack Logo" className={styles['footer-logo']} />
    </a>

    {/* Social icons stacked vertically */}
    <div className={styles['socials']}>
      <a
        href="https://www.instagram.com/935surfshack/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={styles['social-icon-link']}
      >
        <FaInstagram className={styles['social-icon']} />
      </a>

      <a
        href="https://www.facebook.com/profile.php?id=61574086841413"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={styles['social-icon-link']}
      >
        <FaFacebook className={styles['social-icon']} />
      </a>
    </div>
  </div>
</div>



      <div className={styles['footer-section']}>
        <h4>LOCATION</h4>
        <a 
          href="https://www.google.com/maps?q=42.942248942322465,-70.79423135919447" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.addressLink}
        >
          <p>935 Ocean Boulevard</p>
          <p>Hampton, New Hampshire, 03842</p>
        </a>
      </div>


      <div className={styles['footer-section']}>
        <h4>CONTACT</h4>
        <p><strong>Phone:</strong> (603)926-2500</p>
        <p><strong>Email:</strong> info@surfshack.com</p>
        <button className={styles['careers-btn']}>Careers</button>
      </div>

      <div className={styles['footer-section']}>
        <h4>HOURS</h4>
        <p><strong>Thurs-Sat:</strong> 3-8pm</p>
        <p><strong>Sun:</strong> 12-6pm</p>
        <p><strong>Happy Hour:</strong> 3PM – 5PM (Thurs and Fri)</p>
      </div>
    </footer>
  );
}
