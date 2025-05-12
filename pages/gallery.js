// pages/gallery.js
import fs from 'fs'
import path from 'path'
import { useState, useEffect, useMemo } from 'react'
import Layout from '../components/Layout'
import Masonry from 'react-masonry-css'
import styles from '../styles/components/gallery.module.css'

export async function getStaticProps() {
  const imagesDirectory = path.join(process.cwd(), 'public/gallery')
  const filenames = fs.readdirSync(imagesDirectory)
  const images = filenames.map((name) => `/gallery/${name}`)
  return { props: { images } }
}

export default function Gallery({ images }) {

  const breakpointColumnsObj = useMemo(() => ({
    default: 3,
    1100: 2,
    700: 1,
  }), [])

  const [columns, setColumns] = useState(breakpointColumnsObj.default)


  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth
      // find the first breakpoint <= w
      const bp = Object.entries(breakpointColumnsObj)
        .sort((a, b) => b[0] - a[0])
        .find(([breakAt]) => breakAt === 'default' || w <= +breakAt)
      setColumns(bp ? bp[1] : breakpointColumnsObj.default)
    }
    window.addEventListener('resize', updateColumns)
    updateColumns()
    return () => window.removeEventListener('resize', updateColumns)
  }, [breakpointColumnsObj])


  const [shuffled, setShuffled] = useState(images)
  useEffect(() => {
    setShuffled((imgs) => [...imgs].sort(() => Math.random() - 0.5))
  }, [])


  const fillerCount = useMemo(() => {
    const rem = shuffled.length % columns
    return rem === 0 ? 0 : columns - rem
  }, [shuffled.length, columns])

  return (
    <Layout>
      <div className={styles.masonryContainer}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {shuffled.map((src, i) => (
            <div key={i} className={styles.galleryItem}>
              <img src={src} alt={`Gallery ${i+1}`} />
            </div>
          ))}


          {Array.from({ length: fillerCount }).map((_, i) => (
            <div
              key={`filler-${i}`}
              className={styles.galleryItem + ' ' + styles.filler}
            />
          ))}
        </Masonry>
      </div>
    </Layout>
  )
}
