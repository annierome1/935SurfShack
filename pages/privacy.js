import Layout from "../components/Layout";
import styles from "../styles/components/privacypage.module.css"; // corrected path

export default function Privacy() {
  return (
    <Layout>
      <div className={styles.privacyContainer}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}><strong>Last Updated:</strong> August 7, 2025</p>

        <p>
          This website uses <strong>Google Analytics</strong> to help us
          understand how visitors use the site. Google Analytics collects
          information such as your browser type, operating system, pages
          visited, time spent on pages, and other anonymous usage data.
        </p>

        <h2>How We Use This Data</h2>
        <ul>
          <li>Monitor website performance</li>
          <li>Improve content and user experience</li>
          <li>Identify and fix technical issues</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Google Analytics uses cookies to track visits. Cookies are small text
          files stored on your device and do not contain personally
          identifiable information.
        </p>

        <h2>Opting Out</h2>
        <p>
          You can opt out of Google Analytics tracking by:
        </p>
        <ul>
          <li>
            Installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
          </li>
          <li>Adjusting your browser’s cookie settings to refuse cookies</li>
        </ul>

        <h2>Third-Party Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personally
          identifiable information to outside parties.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will
          be posted on this page.
        </p>

        <p>
          If you have any questions, contact us at{" "}
          <a href="mailto:info@935ocean.com">info@935ocean.com</a>.
        </p>
      </div>
    </Layout>
  );
}