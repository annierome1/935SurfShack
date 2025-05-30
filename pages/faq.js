'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Faq from '../components/FAQ';
import styles from '../styles/components/faq.module.css'; 

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className={styles.faqWrapper}>
        <Faq />
      </main>
      <Footer />
    </>
  );
}
