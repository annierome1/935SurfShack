import Layout from '../components/Layout';
import Head from 'next/head';
import Faq from '../components/FAQ';
import styles from '../styles/components/faq.module.css';

export default function FAQPage() {
  return (
    <Layout>
      <Head>
        <title>FAQ — 935 Surf Shack</title>
      </Head>
      <div className={styles.faqWrapper}>
        <Faq />
      </div>
    </Layout>
  );
}
