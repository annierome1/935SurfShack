// pages/menu/[slug].js
// A dynamic page to display individual menu items based on a URL slug.
// This sample uses static paths and data; replace with Sanity.io data fetching as needed.

import Layout from '../../components/Layout';
import MenuCard from '../../components/MenuCard';
import { useRouter } from 'next/router';

export default function MenuItem({ menuItem }) {
  const router = useRouter();

  // Display a loading state if the page is not yet generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section style={sectionStyle}>
        <MenuCard
          title={menuItem.title}
          description={menuItem.description}
          price={menuItem.price}
          imageUrl={menuItem.imageUrl}
        />
      </section>
    </Layout>
  );
}

const sectionStyle = {
  padding: '50px 20px',
};

// For a production app, fetch paths and data from Sanity.io
export async function getStaticPaths() {
  // Placeholder slugs; replace with your Sanity query for menu item slugs.
  const paths = [
    { params: { slug: 'grilled-fish-taco' } },
    { params: { slug: 'surf-salad' } },
  ];
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Placeholder data; replace with a Sanity query based on params.slug.
  const menuItem =
    params.slug === 'grilled-fish-taco'
      ? {
          title: 'Grilled Fish Taco',
          description: 'Freshly grilled fish with salsa and avocado.',
          price: 12.99,
          imageUrl: '/images/fish-taco.jpg',
        }
      : {
          title: 'Surf Salad',
          description: 'Mixed greens, tropical fruits, and citrus dressing.',
          price: 9.99,
          imageUrl: '/images/surf-salad.jpg',
        };

  return { props: { menuItem } };
}
