import Layout from '../components/Layout';
import styles from '../styles/components/contact.module.css';
import { FaInstagram, FaFacebook } from 'react-icons/fa';


export default function Contact() {

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

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
            <a
        href="https://www.instagram.com/935surfshack/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={styles['social-icon-link']}
      >
        <FaInstagram className={styles['social-icon']} />
      </a>

      <a
        href="https://www.facebook.com/profile.php?id=61574086841413"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={styles['social-icon-link']}
      >
        <FaFacebook className={styles['social-icon']} />
      </a>
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
                {/* ===== CAREERS SECTION ===== */}
                <div className={styles.careersSection}>
          <h2 className={styles.careersTitle}>Join Our Team</h2>
          <p className={styles.careersSubtitle}>
            We’re always looking for friendly, reliable people to join the 935 Surf Shack family. Fill out the form below and we’ll be in touch!
          </p>
          <form
            className={styles.careersForm}
            action="https://formspree.io/f/YOUR_CAREERS_FORM_ID"
            method="POST"
            encType="multipart/form-data"
          >
            <div className={styles.formRow}>
              <input name="fullName" className={styles.input} type="text" placeholder="Full Name" required />
              <input name="email" className={styles.input} type="email" placeholder="Email Address" required />
            </div>
            <div className={styles.formRow}>
              <input name="phone" className={styles.input} type="tel" placeholder="Phone Number" />
              <input name="position" className={styles.input} type="text" placeholder="Position Interested In" />
            </div>
            <textarea
              name="coverLetter"
              className={styles.textarea}
              rows={2}
              onInput={autoResize}
              placeholder="Tell us why you'd be a great fit…"
            />
            <label className={styles.fileLabel}>
              Upload Résumé (PDF, DOC)
              <input name="resume" className={styles.fileInput} type="file" accept=".pdf,.doc,.docx" />
            </label>
            <button className={styles.button} type="submit">Submit Application</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
