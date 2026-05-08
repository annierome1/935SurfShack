// components/Footer.js
import Image from 'next/image';
import styles from "../styles/components/Footer.module.css";
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Logo + Socials */}
      <div className={`${styles.footerSection} ${styles.logoSection}`}>
        <a
          href="https://www.935ocean.com/"
          aria-label="935 Ocean Inn homepage"
          className={styles.logoLink}
        >
          <Image
            src="/inn_logo.png"
            alt="935 Ocean Inn Logo"
            width={175}
            height={80}
            className={styles.footerLogo}
            style={{ height: 'auto' }}
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
      </div>

      {/* Hours */}
      <div className={`${styles.footerSection} ${styles.hoursSection}`}>
        <h4>HOURS</h4>
        <span className={styles.breakLine}><strong>Fri & Sat:</strong> 3–9</span>
        <span className={styles.breakLine}><strong>Sunday:</strong> 12–9</span>
      </div>

      <div className={styles.rightsRes}>
        &copy; {currentYear} 935 Surf Shack. All rights reserved.
      </div>
    </footer>
  );
}
