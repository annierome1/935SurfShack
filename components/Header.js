'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/components/Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';



export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Handle header styling based on scroll position and route.
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Toggle the mobile menu.
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Build header class based on scroll state and route.
  const headerClass = `
    ${styles.header}
    ${isHome && !scrolled ? styles.headerHomeTransparent : styles.headerSolid}
  `;

  return (
    <>
      {/* Top external banner */}
      <div className={styles.topBanner}>
        <a
          href="https://www.935ocean.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bannerLink}
        >
          Go to 935 Ocean BeachSide Inn
        </a>
      </div>
  
      <header className={headerClass}>
      <div className={styles.headerLeft}>
        <Link href="/" className={styles.logoLink} onClick={closeMenu}>
          <Image
            src="/Logo_transparent.png"
            alt="935 Surf Shack Logo"
            width={160}
            height={0}
            className={styles.logoImage}
            style={{ height: 'auto', objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Desktop: location & hours beside logo, Mobile: stacked below */}
        <div className={styles.logoDetails}>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=935+Ocean+Boulevard,+Hampton,+NH+03842"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.location}
          >
            935 Ocean Boulevard, Hampton, NH 03842
          </a>
          <p className={styles.hours}>
            Thurs–Sat: 3–8pm · Sun: 12–6pm <br />
            <span className={styles.subHours}>Happy Hour: 3–5pm (Thurs & Fri)</span>
          </p>
        </div>

      </div>
        
        {/* Desktop & Mobile Navigation */}
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navLink} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className={styles.navLink} onClick={closeMenu}>
                Music & Events
              </Link>
            </li>
            <li>
              <Link href="/menu" className={styles.navLink} onClick={closeMenu}>
                Food & Drink
              </Link>
            </li>
            <li>
              <Link href="/gallery" className={styles.navLink} onClick={closeMenu}>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/faq" className={styles.navLink} onClick={closeMenu}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navLink} onClick={closeMenu}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
  
        {/* Mobile Menu Toggle Button */}
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
    </>
  );
}