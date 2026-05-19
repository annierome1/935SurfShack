import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';
import styles from '../styles/components/faq.module.css';

const faqs = [
  {
    question: "Is the Surf Shack open to the public/non-hotel guests?",
    answer: "Absolutely! The Surf Shack is open to everyone during operating hours. Our hours change seasonally, so be sure to check our website for the most recent hours. The only areas on the property that are off limits would be those reserved for our hotel guests including but not limited to the pool, back deck of the hotel, and the hotel itself."
  },
  {
    question: "What are your hours?",
    answer: "Our hours change seasonally, so be sure to check our website for the most recent hours. Currently we are open Friday & Saturday 3–9 and Sunday 12–9."
  },
  {
    question: "Where is the Surf Shack located?",
    answer: "We are located at 935 Ocean Boulevard Hampton, NH 03842 in the backyard of the 935 Ocean Inn. The 935 Ocean Inn is located behind the Town of Hampton residents’ parking lot that is next to the previous Cinnamon Rainbows location. When you reach the property, follow the signs to the backyard through our gravel parking lot."
  },
  {
    question: "Where can I park?",
    answer: "Bicycle and Moped parking are available in our gravel parking lot. All other vehicles will need to be parked in the Town of Hampton resident lot (for Hampton residents only) or the paid parking in the lot across the street and along the wall since our parking lot and reserved spaces are for hotel guests only. We appreciate your understanding!"
  },
  {
    question: "How can I book a room at 935 Ocean?",
    answer: (
      <>
        You can book a room at 935 Ocean Inn{' '}
        <a
          href="https://www.935ocean.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </>
    )
  },
  {
    question: "Do you have a Happy Hour?",
    answer: (
      <>
        Our happy hour is from 3-5pm on weekdays. Happy hour specials change so be sure to check our{' '}
        <Link href="/menu">
          menu
        </Link>{' '}
        for the most up-to-date specials!
      </>
    )
  },
  {
    question: "What months is the Surf Shack open?",
    answer: "We're open for the 2026 season! Hours are Friday & Saturday 3–9 and Sunday 12–9. Summer hours may expand, so check back for updates."
  },
  {
    question: "Where can I find the Live Music schedule?",
    answer: (
      <>
        View our Music &amp; Event calendar{' '}
        <Link href="/events">
          here
        </Link>
        .
      </>
    )
  },
  {
    question: "How can I book a private event?",
    answer: (
      <>
        Please fill out the form{' '}
        <Link href="/events">
          here
        </Link>{' '}
        and someone will be in touch with you shortly! Thank you for your interest!
      </>
    )
  },
  {
    question: "I’m a vendor/live musician/bartender/prep cook and want to work with the Surf Shack, how do I get in touch with you?",
    answer: (
      <>
        Please fill out the form{' '}
        <Link href="/events">
          here
        </Link>{' '}
        and someone will be in touch with you shortly! Thank you for your interest!
      </>
    )
  }
];
export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FadeIn>
      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => toggle(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(index); }}
            >
              <div className={styles.question}>
                {faq.question}
                <span className={`${styles.icon} ${activeIndex === index ? styles.iconOpen : ''}`}>+</span>
              </div>
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className={styles.answer}>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}