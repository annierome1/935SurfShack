// pages/gallery.js
import fs from 'fs'
import path from 'path'
import { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import FadeIn from '../components/FadeIn'
import Masonry from 'react-masonry-css'
import styles from '../styles/components/gallery.module.css'

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
}

export async function getStaticProps() {
  const imagesDirectory = path.join(process.cwd(), 'public/gallery')
  const filenames = fs.readdirSync(imagesDirectory)
  const images = filenames
    .filter((name) => /\.(jpe?g|png|webp|gif)$/i.test(name))
    .map((name) => `/gallery/${name}`)
  return { props: { images } }
}

export default function Gallery({ images }) {
  const [shuffled, setShuffled] = useState(images)

  useEffect(() => {
    setShuffled((imgs) => [...imgs].sort(() => Math.random() - 0.5))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Gallery — 935 Surf Shack</title>
      </Head>
      <FadeIn>
        <div className={styles.masonryContainer}>
          <h1 className={styles.galleryTitle}>Gallery</h1>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.myMasonryGrid}
            columnClassName={styles.myMasonryGridColumn}
          >
            {shuffled.map((src, i) => (
              <div key={src} className={styles.galleryItem}>
                <Image
                  src={src}
                  alt={`935 Surf Shack gallery photo ${i + 1}`}
                  width={600}
                  height={450}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div className={styles.galleryOverlay} />
              </div>
            ))}
          </Masonry>
        </div>
      </FadeIn>
    </Layout>
  )
}
