import fs from 'fs'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from '../styles/components/gallery.module.css'

export async function getStaticProps() {
  const imagesDirectory = path.join(process.cwd(), 'public/gallery')
  const filenames = fs.readdirSync(imagesDirectory)
  const images = filenames
    .filter((name) => /\.(jpe?g|png|webp|gif)$/i.test(name))
    .map((name) => `/gallery/${name}`)
  return { props: { images } }
}

function GalleryImage({ src, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className={styles.galleryItem}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08, ease: 'easeOut' }}
      onClick={() => onClick(index)}
    >
      <Image
        src={src}
        alt={`935 Surf Shack photo ${index + 1}`}
        width={600}
        height={450}
        sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </motion.div>
  )
}

export default function Gallery({ images }) {
  const [shuffled, setShuffled] = useState(images)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const isOpen = lightboxIndex !== null

  useEffect(() => {
    setShuffled((imgs) => [...imgs].sort(() => Math.random() - 0.5))
  }, [])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const openLightbox = useCallback((i) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % shuffled.length)
  }, [shuffled.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + shuffled.length) % shuffled.length)
  }, [shuffled.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, closeLightbox, goNext, goPrev])

  // Swipe support
  const touchStart = useRef(null)
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
    touchStart.current = null
  }

  return (
    <Layout>
      <Head>
        <title>Gallery — 935 Surf Shack</title>
      </Head>

      <div className={styles.galleryContainer}>
        <h1 className={styles.galleryTitle}>Gallery</h1>
        <div className={styles.grid}>
          {shuffled.map((src, i) => (
            <GalleryImage key={src} src={src} index={i} onClick={openLightbox} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button className={styles.lightboxClose} onClick={closeLightbox}>
              <FaTimes />
            </button>

            <button
              className={`${styles.lightboxArrow} ${styles.lightboxPrev}`}
              onClick={(e) => { e.stopPropagation(); goPrev() }}
            >
              <FaChevronLeft />
            </button>

            <motion.div
              key={lightboxIndex}
              className={styles.lightboxImageWrapper}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={shuffled[lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                width={1200}
                height={900}
                sizes="90vw"
                style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain' }}
                priority
              />
            </motion.div>

            <button
              className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
              onClick={(e) => { e.stopPropagation(); goNext() }}
            >
              <FaChevronRight />
            </button>

            <div className={styles.lightboxCounter}>
              {lightboxIndex + 1} / {shuffled.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}
