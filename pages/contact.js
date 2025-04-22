import Layout from '../components/Layout';
import styles from '../styles/components/contact.module.css';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';

import FormSubmit from '../components/FormSubmit';
import careersImg from '../public/images/careers-hero.jpg';

export default function Contact() {
  const [resumeFile, setResumeFile] = useState(null);
  const [selectedPositions, setSelectedPositions] = useState([]);

  const positions = [
    'Bartender',
    'Prep-Cook',
    'Musician',
  ];

  const autoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file || null);
  };

  const handlePositionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPositions((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((pos) => pos !== value)
    );
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
            <FormSubmit
              formType="contact"
              thankYouUrl= "chris@935ocean.com"
              subject="New Contact Inquiry"
              className={styles.form}
            >
              <input
                name="name"
                className={styles.input}
                type="text"
                placeholder="Your Name"
                required
              />
              <input
                name="email"
                className={styles.input}
                type="email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                className={styles.textarea}
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
            </FormSubmit>
          </div>
        </div>

        {/* ===== CAREERS SECTION ===== */}
        <div className={styles.careersSection}>
          <h2 className={styles.careersTitle}>Join Our Team</h2>
          <p className={styles.careersSubtitle}>
            We’re always looking for friendly, reliable people to join the 935 Surf Shack family…
          </p>

          <div className={styles.careersContent}>
            {/* ← FORM COLUMN */}
            <FormSubmit
              formType="careers"
              thankYouUrl=" chris@935ocean.com"
              subject="Career Application"
              className={styles.careersForm}
            >
              <div className={styles.formRow}>
                <input
                  name="fullName"
                  className={styles.input}
                  type="text"
                  placeholder="Full Name"
                  required
                />
                <input
                  name="email"
                  className={styles.input}
                  type="email"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <input
                  name="phone"
                  className={styles.input}
                  type="tel"
                  placeholder="Phone Number"
                />
              </div>

              <fieldset className={styles.positionFieldset}>
                <legend className={styles.positionLegend}>
                  Position applying for <span className={styles.required}>*</span>
                </legend>
                <div className={styles.positionsGrid}>
                  {positions.map((pos) => (
                    <label key={pos} className={styles.positionLabel}>
                      <input
                        type="checkbox"
                        name="positions"
                        value={pos}
                        checked={selectedPositions.includes(pos)}
                        onChange={handlePositionChange}
                        required={selectedPositions.length === 0}
                      />
                      {pos}
                    </label>
                  ))}
                </div>
              </fieldset>

              <textarea
                name="coverLetter"
                className={styles.textarea}
                rows={4}
                onInput={autoResize}
                placeholder="Tell us why you'd be a great fit…"
              />

              <label className={styles.fileLabel}>
                Upload Résumé (PDF, DOC)
                <input
                  name="resume"
                  className={styles.fileInput}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>

              {resumeFile && (
                <div className={styles.filePreview}>
                  <strong>Selected file:</strong> {resumeFile.name}
                </div>
              )}
        
            </FormSubmit>

            {/* ← IMAGE COLUMN */}
            <div className={styles.careersImageBox}>
              <div className={styles.careersImage}>
                <Image
                  src={careersImg}
                  alt="Join our team"
                  layout="responsive"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
