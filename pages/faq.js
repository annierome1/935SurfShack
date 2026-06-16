import Layout from '../components/Layout';
import Head from 'next/head';
import Faq from '../components/FAQ';
import styles from '../styles/components/faq.module.css';
import { getHours } from '../lib/getHours';

export async function getStaticProps() {
  const hours = await getHours();
  return { props: { hours }, revalidate: 300 };
}

export default function FAQPage({ hours }) {
  return (
    <Layout>
      <Head>
        <title>FAQ — 935 Surf Shack</title>
      </Head>
      <div className={styles.faqWrapper}>
        <Faq hours={hours} />
      </div>
    </Layout>
  );
}
