// pages/menu.js
import { useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/components/menu.module.css';
import menuData from '../public/data/menu.json';
import { client } from '../src/sanity/lib/client';

export default function Menu({ menu }) {
  const [activeTab, setActiveTab] = useState('food');
  const foodDownloadUrl = menu.menuPdf?.asset?.url;
  const drinkDownloadUrl = menu.drinkPdf?.asset?.url;

  const tabs = [
    { key: 'food', label: 'Food' },
    { key: 'drinks', label: 'Drinks' },
    { key: 'specials', label: 'Specials' },
  ];

  const renderSection = (title, items, isImageItems = false, useGrid = false) => (
    <div key={title} className={styles.categoryBlock}>
      <h3 className={styles.categoryTitle}>{title}</h3>
      <div className={useGrid ? styles.itemGrid : styles.itemList}>
        {items.map((item, idx) => (
          <div key={idx} className={styles.menuItem}>
            <div className={styles.menuItemText}>
              <h4 className={styles.itemName}>{item.name}</h4>
              {item.description && <p className={styles.itemDesc}>{item.description}</p>}
            </div>
            <div className={styles.menuItemDetails}>
              <span className={styles.itemPrice}>
                ${item.price.toFixed(isImageItems ? 2 : 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Menu</h1>

        <div className={styles.tabContainer}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${
                activeTab === tab.key ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FOOD */}
        {activeTab === 'food' && (
          <>
            <div className={styles.menuSection}>
              {Object.entries(menuData.food).map(([cat, items]) =>
                renderSection(cat, items, false, false)
              )}
            </div>
            {foodDownloadUrl && (
              <div className={styles.downloadContainer}>
                <a
                  href={foodDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadButton}
                >
                  Download Full Food Menu
                </a>
              </div>
            )}
          </>
        )}

        {/* DRINKS */}
        {activeTab === 'drinks' && (
          <>
            <div className={`${styles.menuSection} ${styles.drinkSection}`}>
              {Object.entries(menuData.drink).map(([section, drinks]) =>
                renderSection(section, drinks, false, true)
              )}
            </div>
            {drinkDownloadUrl && (
              <div className={styles.downloadContainer}>
                <a
                  href={drinkDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadButton}
                >
                  Download Full Drink Menu
                </a>
              </div>
            )}
          </>
        )}

{/* SPECIALS */}
{activeTab === 'specials' && (
  <div className={`${styles.menuSection} ${styles.specialsSection}`}>
    {[
      { title: 'Food Specials', items: menu.foodSpecials },
      { title: 'Drink Specials', items: menu.drinkSpecials }
    ].map(({ title, items }) => (
      <div key={title} className={styles.categoryBlock}>
        <h3 className={styles.categoryTitle}>{title}</h3>

        {items && items.length > 0 ? (
          <div className={styles.itemGrid}>
            {items.map((item, idx) => {
              // Grab the asset metadata so we can preserve aspect ratio
              const dims = item.image?.asset?.metadata?.dimensions || {};
              return (
                <div key={idx} className={styles.menuItem}>
                  {item.image?.asset?.url && dims.width && dims.height && (
                    <div className={styles.specialImageWrapper}>
                      <Image
                        src={item.image.asset.url}
                        alt={item.name}
                        layout="responsive"
                        width={dims.width}
                        height={dims.height}
                        objectFit="cover"
                      />
                    </div>
                  )}

                  <div className={styles.menuItemText}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    {item.description && <p className={styles.itemDesc}>{item.description}</p>}
                  </div>
                    <span className={styles.itemPrice}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
              
              );
            })}
          </div>
        ) : (
          <p className={styles.itemDesc}>No {title.toLowerCase()} available.</p>
        )}
      </div>
    ))}
  </div>
)}

      </div>
    </Layout>
  );
}

// fetch menu data from Sanity
// pages/menu.js

export async function getStaticProps() {
  const query = `*[_type == "menu"][0]{
    menuPdf { asset->{ url } },
    drinkPdf { asset->{ url } },
    foodSpecials[]{
      name,
      price,
      image{
        asset->{
          url,
          metadata{ dimensions{ width, height } }
        }
      }
    },
    drinkSpecials[]{
      name,
      price,
      image{
        asset->{
          url,
          metadata{ dimensions{ width, height } }
        }
      }
    }
  }`;
  const menu = await client.fetch(query);
  return { props: { menu }, revalidate: 60 };
}

