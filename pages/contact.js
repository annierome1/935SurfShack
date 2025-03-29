import Layout from '../components/Layout';
import styles from '../styles/components/contact.module.css';

export default function Contact() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>🌺 Let's Get in Touch</h1>
        <p className={styles.subtitle}>
          Have a question? Want to book a private event? Just wanna say hey?
        </p>

        <div className={styles.grid}>
          {/* Contact Info */}
          <div className={styles.infoBox}>
            <h2>📍 Visit Us</h2>
            <p>935 Ocean BeachSide Inn</p>
            <p>123 Beachfront Ave, Ocean City, Example State</p>
            <p>📞 (123) 456-7890</p>
            <p>📧 hello@surfshack.com</p>

            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formBox}>
            <h2>💬 Send Us a Message</h2>
            <form className={styles.form}>
              <input className={styles.input} type="text" placeholder="Your Name" required />
              <input className={styles.input} type="email" placeholder="Your Email" required />
              <textarea className={styles.textarea} rows="5" placeholder="Your Message" required></textarea>
              <button className={styles.button} type="submit">Send Message 🚀</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
