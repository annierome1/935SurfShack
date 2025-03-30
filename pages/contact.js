import Layout from '../components/Layout';
import styles from '../styles/components/contact.module.css';

export default function Contact() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Us!</h1>
        <p className={styles.subtitle}>
          Have a question? Want to book a private event?
        </p>

        <div className={styles.grid}>
          {/* Contact Info */}
          <div className={styles.infoBox}>
            <h2>Visit Us</h2>
            <p>📞 (123) 456-7890</p>
            <p>📧 hello@surfshack.com</p>
            <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.616197882931!2d-70.81102238454497!3d42.90968737915406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2b3ffdfce4a6b%3A0xe34f1b2e3aaeb4e9!2s935%20Ocean%20Blvd%2C%20Hampton%2C%20NH%2003842!5e0!3m2!1sen!2sus!4v1711826200891!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>



            <div className={styles.socials}>
              <a href="https://www.instagram.com/935surfshack/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/profile.php?id=61574086841413" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>


          {/* Contact Form */}
          <div className={styles.formBox}>
            <h2>Send Us a Message</h2>
            <form className={styles.form}>
              <input className={styles.input} type="text" placeholder="Your Name" required />
              <input className={styles.input} type="email" placeholder="Your Email" required />
              <textarea className={styles.textarea} rows="5" placeholder="Your Message" required></textarea>
              <button className={styles.button} type="submit">Send Message </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
