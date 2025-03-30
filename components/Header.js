'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/components/Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Pacifico } from 'next/font/google';
import Image from 'next/image';

const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  });
  
  export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';
  
    // Toggle "scrolled" state
    useEffect(() => {
      // If NOT on the homepage, always use the "solid" header
      if (!isHome) {
        setScrolled(true);
        return;
      }
  
      // If on the homepage, only set "scrolled" after user scrolls
      const handleScroll = () => {
        setScrolled(window.scrollY > 400);;
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);
  
    // Mobile menu toggles
    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);
  
    // Build the header class based on "scrolled" and "isHome"
    const headerClass = `
      ${styles.header}
      ${isHome && !scrolled ? styles.headerHomeTransparent : styles.headerSolid}
      ${isOpen ? styles.openMenu : ''}
    `;
  
    return (
      <header className={headerClass}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink} onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="935 Surf Shack Logo"
              width={160}
              height={0} // Let height auto-size
              style={{ height: 'auto', objectFit: 'contain' }}
              priority
            />
          </Link>
        </div>
  
        <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/" className={styles.navLink} onClick={closeMenu}>Home</Link></li>
            <li><Link href="/events" className={styles.navLink} onClick={closeMenu}>Live Music</Link></li>
            <li><Link href="/menu" className={styles.navLink} onClick={closeMenu}>Food & Drink</Link></li>
            <li><Link href="/gallery" className={styles.navLink} onClick={closeMenu}>Gallery</Link></li>
            <li><Link href="/contact" className={styles.navLink} onClick={closeMenu}>Contact Us</Link></li>
          </ul>
        </nav>
  
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
    );
}