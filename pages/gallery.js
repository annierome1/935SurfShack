// pages/gallery.js
import fs from 'fs';
import path from 'path';
import Layout from '../components/Layout';
import Masonry from 'react-masonry-css';

export async function getStaticProps() {
  // Get the images from the public/images directory
  const imagesDirectory = path.join(process.cwd(), 'public/images');
  const filenames = fs.readdirSync(imagesDirectory);
  let images = filenames.map((name) => `/images/${name}`);

  // Shuffle the images array using Fisher-Yates shuffle
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  return {
    props: { images },
  };
}

export default function Gallery({ images }) {
  // Define breakpoints for the Masonry layout
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Layout>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Gallery image ${index + 1}`} />
        ))}
      </Masonry>
      <style jsx global>{`
        .my-masonry-grid {
          display: flex;
          margin-left: -15px; /* Adjust gutter size offset */
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 15px; /* Gutter size */
          background-clip: padding-box;
        }
        /* Style each image in the grid */
        .my-masonry-grid_column > img {
          margin-bottom: 15px;
          width: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .my-masonry-grid_column > img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Layout>
  );
}
