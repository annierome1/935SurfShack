import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/components/menu.module.css';
import menuData from '../public/data/menu.json';
import foodHero from '../public/images/food-hero.jpg';     // replace with your real path
import drinkHero from '../public/images/drink-hero.jpg';   // replace with your real path

export default function Menu({ menu }) {
  const [activeTab, setActiveTab] = useState('menu');

  // pick PDF based on section
  const downloadUrl = menu.menuPdf?.asset?.url;

  return (
    <Layout>
      <div className={styles.container}>

        {/* Page Title */}
        <h1 className={styles.title}>Beach Bar &amp; Grill</h1>

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

        {/* ====== MENU GRID (Food + Drinks) ====== */}
        {activeTab === 'menu' && (
          <>
            {/* FOOD GRID */}
            <div className={styles.sectionHeader}>
              <span className={styles.icon}>🍴</span>
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

            {/* DRINKS GRID */}
            <div className={styles.sectionHeader}>
              <span className={styles.icon}>🍹</span>
              <h2>Drinks</h2>
            </div>
            <div className={styles.drinkGrid}>
              {/* Gin & Vodka */}
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>Gin &amp; Vodka</h3>
                {menuData.drink["Liquor & Wine"].GIN.map((name,i) => (
                  <div key={i} className={styles.itemRowSimple}>{name}</div>
                ))}
                {menuData.drink["Liquor & Wine"].VODKA.map((name,i) => (
                  <div key={i} className={styles.itemRowSimple}>{name}</div>
                ))}
              </div>

              {/* Hero image */}
              <div className={styles.imageCard}>
                <Image
                  src={drinkHero}
                  alt="Tropical cocktails"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>

              {/* Rum & Tequila */}
              <div className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>Rum &amp; Tequila</h3>
                {menuData.drink["Liquor & Wine"].RUM.map((name,i) => (
                  <div key={i} className={styles.itemRowSimple}>{name}</div>
                ))}
                {menuData.drink["Liquor & Wine"]["TEQUILA/MEZCAL"].map((name,i) => (
                  <div key={i} className={styles.itemRowSimple}>{name}</div>
                ))}
              </div>

              {/* Beer & Seltzers full‑width */}
              <div className={styles.fullWidthCard}>
                <h3 className={styles.categoryTitle}>Beer &amp; Seltzers</h3>
                <div className={styles.twoColumn}>
                  <div>
                    <div className={styles.subcategoryTitle}>BREWS</div>
                    {menuData.drink["Beer & Beyond"].BREWS.map((b,i) => (
                      <div key={i} className={styles.itemRowSimple}>{b}</div>
                    ))}
                  </div>
                  <div>
                    <div className={styles.subcategoryTitle}>SELTZERS &amp; BEYOND</div>
                    {menuData.drink["Beer & Beyond"]["SELTZERS & BEYOND"].map((b,i) => (
                      <div key={i} className={styles.itemRowSimple}>{b}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a href={downloadUrl} className={styles.downloadButton}>
              Download Full Menu
            </a>
          </>
        )}
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

// 3️⃣ Fix getStaticProps so it actually fetches and returns `menu`
import { client } from '../src/sanity/lib/client';

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


