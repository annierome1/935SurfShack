import styles from "../styles/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles['footer-section']} ${styles['logo-section']}`}>
      <a href="https://www.935ocean.com/" aria-label="Home"><img src="/inn_logo.png" alt="Surf Shack Logo" className={styles['footer-logo']}/></a>
      </div>

      <div className={styles['footer-section']}>
        <h4>LOCATION</h4>
        <p>935 Ocean Boulevard</p>
        <p>Hampton, New Hampshire, 03842</p>
        <p><a href="https://www.google.com/maps?q=42.942248942322465, -70.79423135919447"  target="_blank" rel="noopener noreferrer">Google Maps</a></p>
      </div>

      <div className={styles['footer-section']}>
        <h4>CONTACT</h4>
        <p><strong>Phone:</strong> (603)926-2500</p>
        <p><strong>Email:</strong> info@surfshack.com</p>
        <button className={styles['careers-btn']}>Careers</button>
      </div>

      <div className={styles['footer-section']}>
        <h4>HOURS</h4>
        <p><strong>Open:</strong> 11:00 AM</p>
        <p><strong>Close:</strong> 11:00 PM</p>
        <p><strong>Happy Hour:</strong> 3PM – 5PM</p>
      </div>
    </footer>
  );
}
