// pages/contact.js

import Layout from '../components/Layout';
import styles from '../styles/components/contact.module.css';
import { useState } from 'react';
import Image from 'next/image';
import FormSubmit from '../components/FormSubmit';
import careersImg from '../public/images/careers-hero.jpg';
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

export default function Contact() {
  // State hooks
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [experience, setExperience] = useState('');

  const positions = [
    'Bartender',
    'Prep-Cook',
    'Musician',
  ];

  // Handle file input
  const handleResumeChange = (e) => {
    const file = e.target.files[0] || null;
    setResumeFile(file);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.pageHeader}>Contact Us</h1>
        <p className={styles.headerSubtitle}>
          We&apos;ll get back to you as soon as we can!
        </p>
        <section className={styles.infoSection}>
  <div className={styles.infoGrid}>
    {/* ─── Hours Card ─────────────────────────── */}
    <div className={styles.hoursCard}>
      <h3 className={styles.infoTitle}>Hours</h3>
      <ul className={styles.hoursList}>
        <li>Mon – Wed: Closed</li>
        <li>Thurs & Fri: 3–8 pm</li>
        <li>Sat & Sun: 12-8pm</li>
      </ul>
      <p className={styles.hoursNote}>
        After Labor Day hours!
      </p>
    </div>

    {/* ─── Social Media Card ──────────────────── */}
    <div className={styles.socialCard}>
      <h3 className={styles.infoTitle}>Follow Us</h3>
      <div className={styles.socialLinks}>
        <a href="https://www.facebook.com/profile.php?id=61574086841413" className={styles.socialLink}>
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/935surfshack/" className={styles.socialLink}>
          <FaInstagram />
        </a>
      </div>
    </div>
  </div>
</section>



        {/* ===== CONTACT SECTION ===== */}
        <section className={styles.contactSection}>
          {/* Map Card */}
          <div className={styles.card}>
            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.616197882931!2d-70.81102238454497!3d42.90968737915406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2b3ffdfce4a6b%3A0xe34f1b2e3aaeb4e9!2s935%20Ocean%20Blvd%2C%20Hampton%2C%20NH%2003842!5e0!3m2!1sen!2sus!4v1711826200891!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Message Form Card */}
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Send us a Message</h2>
            <FormSubmit
              formType="inquiry"
              to="chris@935ocean.com"
              subject="New Contact Inquiry"
              buttonText="Send Message"
              className={styles.inquiryForm}
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
            </FormSubmit>
          </div>
        </section>

        {/* ===== CAREERS SECTION ===== */}
        <section className={styles.careersSection}>
          <h2 className={styles.careersHeading}>Let&apos;s Work Together!</h2>
          <p className={styles.headerSubtitle}>
            Thank you for your interest in working with us! We appreciate you reaching out.
            Please fill out the form below and attach your resume; we&apos;ll be in touch soon.
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
                  to="chris@935ocean.com"
                  subject="Career Application"
                  buttonText="Submit Application"
                  className={styles.careerForm}
                >
                  <div className={styles.field}>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" name="name" type="text" required />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" required />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="position">Position Interested In</label>
                    <select
                      id="position"
                      name="position"
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

                  <div className={styles.field}>
                    <label className={styles.fileLabel} htmlFor="resume">
                      Upload Resume (PDF/DOC)
                    </label>
                    <input
                      id="resume"
                      name="resumeFileName"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className={styles.fileInput}
                    />
                    {resumeFile && (
                      <div className={styles.filePreview}>
                        Selected file: {resumeFile.name}
                      </div>
                    )}
                  </div>

                  {/* hidden field so FormData includes the filename */}
                  <input
                    type="hidden"
                    name="resumeFilename"
                    value={resumeFile ? resumeFile.name : ''}
                  />
                </FormSubmit>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
