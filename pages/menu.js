// pages/menu.js

import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/components/menu.module.css';
import menuData from '../public/data/menu.json';
import foodHero from '../public/images/food-hero.jpg';
import drinkHero from '../public/images/drink-hero.jpg';
import drink1 from '../public/images/drink1.jpeg';
import drink2 from '../public/images/drink2.jpeg';
import { client } from '../src/sanity/lib/client';

export default function Menu({ menu }) {
  const [activeTab, setActiveTab] = useState('menu');

  // pick PDF based on section
  const foodDownloadUrl = menu.menuPdf?.asset?.url;
  const drinkDownloadUrl = menu.drinkPdf?.asset?.url;

  return (
    <Layout>
      <div className={styles.container}>

        {/* Page Title */}
        <h1 className={styles.title}>Surf Shack Menu</h1>

        {/* Tabs */}
        <div className={styles.tabContainer}>
          {['menu','specials'].map(tab => (
            <button
              key={tab}
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'menu' ? 'Menu' : 'Specials'}
            </button>
          ))}
        </div>

        {/* ====== MENU VIEW ====== */}
        {activeTab === 'menu' && (
          <>
            {/* ===== FOOD SECTION ===== */}
            <div className={styles.sectionHeader}>
              <span className={styles.icon}></span>
              <h2>Food</h2>
            </div>
            <div className={styles.foodGrid}>
              {Object.entries(menuData.food).slice(0,2).map(([cat, items]) => (
                <div key={cat} className={styles.categoryCard}>
                  <h3 className={styles.categoryTitle}>{cat}</h3>
                  {items.map((it,i) => (
                    <div key={i} className={styles.itemRow}>
                      <div>
                        <div className={styles.itemName}>{it.name}</div>
                        <div className={styles.itemDesc}>{it.description}</div>
                      </div>
                      <div className={styles.itemPrice}>${it.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              ))}

              <div className={styles.imageCard}>
                <Image
                  src={foodHero}
                  alt="Beachside bites"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>

              {Object.entries(menuData.food).slice(2,4).map(([cat, items]) => (
                <div key={cat} className={styles.categoryCard}>
                  <h3 className={styles.categoryTitle}>{cat}</h3>
                  {items.map((it,i) => (
                    <div key={i} className={styles.itemRow}>
                      <div>
                        <div className={styles.itemName}>{it.name}</div>
                        <div className={styles.itemDesc}>{it.description}</div>
                      </div>
                      <div className={styles.itemPrice}>${it.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ===== DRINKS SECTION ===== */}

            <div className={styles.sectionHeader}>
              <span className={styles.icon}></span>
              <h2>Drinks</h2>
            </div>
            <div className={styles.drinkGrid}>
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>Gin &amp; Vodka</h3>
                {menuData.drink["Liquor & Wine"].GIN.map((name,i) => (
                  <div key={i} className={styles.itemRowSimple}>{name}</div>
                ))}
                {menuData.drink["Liquor & Wine"].VODKA.map((name,i) => (
                  <div key={i} className={styles.itemRowSimple}>{name}</div>
                ))}
              </div>

              <div className={styles.imageCard}>
                <Image
                  src={drinkHero}
                  alt="Tropical cocktails"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>

              <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>Rum &amp; Tequila</h3>
                {menuData.drink["Liquor & Wine"].RUM.map((name,i) => (
                  <div key={i} className={styles.itemRowSimple}>{name}</div>
                ))}
                {menuData.drink["Liquor & Wine"]["TEQUILA/MEZCAL"].map((name,i) => (
                  <div key={i} className={styles.itemRowSimple}>{name}</div>
                ))}
              </div>

              <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>Brews</h3>
                {(menuData.drink["Beer & Beyond"]?.BREWS || []).map((brew, idx) => (
                  <div key={idx} className={styles.itemRowSimple}>{brew}</div>
                ))}
              </div>

              <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>Seltzers &amp; Beyond</h3>
                {(menuData.drink["Beer & Beyond"]?.["SELTZERS & BEYOND"] || []).map((s, idx) => (
                  <div key={idx} className={styles.itemRowSimple}>{s}</div>
                ))}
              </div>
            </div>

             {/* ===== DRINK IMAGE GALLERY ===== */}
             <div className={styles.imageGallery}>
              {[drink1, drink2].map((imgSrc, idx) => (
                <div key={idx} className={styles.galleryItem}>
                  <Image
                    src={imgSrc}
                    alt={`Drink ${idx+1}`}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              ))}
            </div>

            {/* ===== DOWNLOAD LINKS ===== */}
            <div className={styles.downloadContainer}>
              {foodDownloadUrl && (
                <a
                  href={foodDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadButton}
                >
                  Download Full Food Menu
                </a>
              )}
              {drinkDownloadUrl && (
                <a
                  href={drinkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadButton}
                >
                  Download Full Drink Menu
                </a>
              )}
            </div>
          </>
        )}

        {/* ===== SPECIALS VIEW ===== */}
        {activeTab === 'specials' && (
          <div className={styles.specials}>
            <div className={styles.section}>
              <h2>Food Specials</h2>
              <ul className={styles.specialList}>
                {menu.foodSpecials?.map((item, idx) => (
                  <li key={idx} className={styles.specialItem}>
                    {item.image?.asset?.url && (
                      <img
                        src={item.image.asset.url}
                        alt={item.name}
                        className={styles.specialImage}
                      />
                    )}
                    <div>
                      <h3>{item.name}</h3>
                      <p>${item.price?.toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.section}>
              <h2>Drink Specials</h2>
              <ul className={styles.specialList}>
                {menu.drinkSpecials?.map((item, idx) => (
                  <li key={idx} className={styles.specialItem}>
                    {item.image?.asset?.url && (
                      <img
                        src={item.image.asset.url}
                        alt={item.name}
                        className={styles.specialImage}
                      />
                    )}
                    <div>
                      <h3>{item.name}</h3>
                      <p>${item.price?.toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

// fetch menu data from Sanity
export async function getStaticProps() {
  const query = `*[_type == "menu"][0]{
    menuPdf { asset->{ url } },
    drinkPdf { asset->{ url } },
    foodSpecials[]{ name, price, image{ asset->{ url } } },
    drinkSpecials[]{ name, price, image{ asset->{ url } } }
  }`;
  const menu = await client.fetch(query);

  return {
    props: { menu },
    revalidate: 60,
  };
}
