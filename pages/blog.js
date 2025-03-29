// pages/blog.js
// A simple blog page placeholder for future posts and updates.

import Layout from '../components/Layout';

export default function Blog() {
  return (
    <Layout>
      <section style={sectionStyle}>
        <h2>Blog</h2>
        <p>Read our latest updates, news, and stories from the Surf Shack Restaurant!</p>
        {/* Future implementation: dynamically list blog posts */}
      </section>
    </Layout>
  );
}

const sectionStyle = {
  padding: '50px 20px',
};
