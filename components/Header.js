'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/components/Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [showMoreHours, setShowMoreHours] = useState(false);

  useEffect(() => {
    // Always solid off-home
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When less than half of #hero is visible, set scrolled = true
        setScrolled(entry.intersectionRatio < 0.5);
      },
      { threshold: [0.5] }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [isHome]);

  const toggleMenu = () => setIsOpen(v => !v);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: '/',         label: 'Home' },
    { href: '/events',   label: 'Music & Events' },
    { href: '/menu',     label: 'Food & Drink' },
    { href: '/gallery',  label: 'Gallery' },
    { href: '/faq',      label: 'FAQ' },
    { href: '/contact',  label: 'Contact Us' },
  ];

  const headerClass = [
    styles.header,
    isHome && !scrolled ? styles.headerHomeTransparent : styles.headerSolid
  ].join(' ');

  return (
    <>
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
          <Link href="/" onClick={closeMenu} className={styles.logoLink}>
            <Image
              src="/Logo_transparent.png"
              alt="935 Surf Shack Logo"
              width={160}
              height={0}
              priority
              className={styles.logoImage}
              style={{ height: 'auto', objectFit: 'contain' }}
            />
          </Link>
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
              Thurs–Sat: 3–8pm · Sun: 12–6pm
            </p>
            <span className={styles.nowOpen}>Now Open!</span>

            <div className={styles.hoursToggleWrapper}>
            <button onClick={() => setShowMoreHours(!showMoreHours)} className={styles.hoursToggle}>
          <FaClock style={{ marginRight: '0.3rem' }} />
          {showMoreHours ? 'Hide Hours Info' : 'See Full Hours'} 
          {showMoreHours ? <FaChevronUp style={{ marginLeft: '0.3rem' }} /> : <FaChevronDown style={{ marginLeft: '0.3rem' }} />}
        </button>


              {showMoreHours && (
                <div className={styles.hoursPopover}>
                  <p className={styles.subHours}>
                    Happy Hour: 3–5pm (Thurs &amp; Fri)<br />
                    Expanded hours after Memorial Day!
                  </p>
                </div>
              )}
            </div>

            
        </div>
        </div>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} onClick={closeMenu} className={styles.navLink}>
                  {label}
                </Link>
              </li>
            ))}
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
    </>
  );
}
