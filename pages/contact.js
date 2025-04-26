import Layout from '../components/Layout';
import styles from '../styles/components/contact.module.css';
//import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';

import FormSubmit from '../components/FormSubmit';
import careersImg from '../public/images/careers-hero.jpg';

export default function Contact() {
  const [setResumeFile] = useState(null);
  const [selectedPosition] = useState([]);
  const [experience, setExperience] = useState('');


  const positions = [
    'Bartender',
    'Prep-Cook',
    'Musician',
  ];

 
  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0] || null);
  };



  return (
    <Layout>
      <div className={styles.container}>
      <h1 className={styles.pageHeader}>Contact Us</h1>
      <p className={styles.headerSubtitle}>
  We&apos;ll get back to you as soon as we can!
</p>
        {/* ===== CONTACT SECTION ===== */}
        <section className={styles.contactSection}>
          {/* Map Card */}
          <div className={styles.card}>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.616197882931!2d-70.81102238454497!3d42.90968737915406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2b3ffdfce4a6b%3A0xe34f1b2e3aaeb4e9!2s935%20Ocean%20Blvd%2C%20Hampton%2C%20NH%2003842!5e0!3m2!1sen!2sus!4v1711826200891!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Message Form Card */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Send us a Message</h2>
            <FormSubmit
              formType="contact"
              thankYouUrl="chris@935ocean.com"
              subject="New Contact Inquiry"
            >
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required />
              </div>
              <div className = {styles.buttonGroup}>
              <button type="submit" className={styles.primaryButton}>
                Send Message
              </button>
              </div>
            </FormSubmit>
          </div>
        </section>

        {/* ===== CAREERS SECTION ===== */}
        <section className={styles.careersSection}>
          <h2 className={styles.careersHeading}>Let's Work Together!</h2>
          <p className={styles.headerSubtitle}>
  Thank you for your interest in working with us! We appreciate you reaching out.
  Could you please fill out the form below with your contact information, a brief
  description of what you&apos;re interested in working on, and your resume or a summary of
  your past experience? We&apos;ll get in touch with you soon!
</p>

          <div className={styles.careersContent}>
            {/* Image Card */}
            <div className={styles.card}>
              <div className={styles.imageHolder}>
              <Image
                src={careersImg}
                alt="Join our team"
                layout="responsive"
                objectFit="cover"
                className={styles.careerImage}
                priority
              />
            </div>
            </div>

            {/* Careers Form Card */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Careers</h3>
              <FormSubmit
                formType="careers"
                thankYouUrl="chris@935ocean.com"
                subject="Career Application"
              >
                <div className={styles.field}>
                  <label htmlFor="fullName">Full Name</label>
                  <input id="fullName" name="fullName" type="text" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email2">Email Address</label>
                  <input id="email2" name="email" type="email" required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="position">Position Interested In</label>
                  <select
                    id="position"
                    name="positions"
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {positions.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="experience">Experience</label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows="4"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className={styles.buttonGroup}>
                  <button type="submit" className={styles.primaryButton}>
                    Submit Application
                  </button>
                  <label className={styles.secondaryButton}>
                    Upload Resume
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      hidden
                    />
                  </label>
                </div>
              </FormSubmit>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

