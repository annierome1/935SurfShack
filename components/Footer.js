// components/Footer.js
import styles from "../styles/components/Footer.module.css";
import { FaInstagram, FaFacebook } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Logo + Socials */}
      <div className={`${styles.footerSection} ${styles.logoSection}`}>
        <a
          href="https://www.935ocean.com/"
          aria-label="Home"
          className={styles.logoLink}
        >
          <img
            src="/inn_logo.png"
            alt="935 Surf Shack Logo"
            className={styles.footerLogo}
          />
        </a>
        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/935surfshack/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={styles.socialIconLink}
          >
            <FaInstagram className={styles.socialIcon} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61574086841413"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={styles.socialIconLink}
          >
            <FaFacebook className={styles.socialIcon} />
          </a>
        </div>
      </div>

      {/* Location */}
      <div className={`${styles.footerSection} ${styles.locationSection}`}>
        <h4>LOCATION</h4>
        <span className={styles.addressText}>
          935 Ocean Boulevard, Hampton, NH 03842
        </span>
      </div>

      {/* Contact */}
      <div className={`${styles.footerSection} ${styles.contactSection}`}>
        <h4>CONTACT</h4>
        <span className={styles.breakLine}><strong>Phone:</strong> (603) 926-2500</span>
        <span className={styles.breakLine}><strong>Email:</strong> info@935surfshack.com</span>
        
      { /* <Link href="/contact">
          <button className={styles.careersBtn}>Careers</button>
        </Link> */}
      </div>

      {/* Hours */}
      <div className={`${styles.footerSection} ${styles.hoursSection}`}>
        <h4>HOURS</h4>

        <span className={styles.breakLine}><strong>Thurs–Sat:</strong> 3–8 pm</span>
        <span className={styles.breakLine}><strong>Sun:</strong> 12–6 pm</span>
        <span className={styles.breakLine}><strong>Happy Hour:</strong> 3–5 pm (Thurs & Fri)</span>
      </div>

      <div className={styles.rightsRes}>© 2025 935 Surf Shack. All rights reserved.</div>
    </footer>
  );
}
