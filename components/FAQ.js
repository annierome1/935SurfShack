'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/components/faq.module.css';

const faqs = [
  {
    question: "Is the Surf Shack open to the public/non-hotel guests?",
    answer: "Absolutely! The Surf Shack is open to everyone during operating hours. Our hours change seasonally, so be sure to check our website for the most recent hours. The only areas on the property that are off limits would be those reserved for our hotel guests including but not limited to the pool, back deck of the hotel, and the hotel itself."
  },
  {
    question: "What are your hours?",
    answer: "Our hours change seasonally, so be sure to check our website for the most recent hours but in general, we are open Thursday - Saturday 3-8pm/Sunday 12-6pm in the Spring and Fall and Tuesday - Saturday 1-8pm/Sunday 12-6pm in the Summer."
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
    answer: "We will be open from May 1st to October 13th (Columbus Day), weather permitting!"
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
    <section className={styles.faqSection}>
      <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => toggle(index)}
          >
            <div className={styles.question}>
              {faq.question}
              <span className={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div className={styles.answer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}