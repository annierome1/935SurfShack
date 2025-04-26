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

  return (
    <Layout>
      <div className={styles.container}>
        {/* Page Title */}
        <h1 className={styles.title}>Our Menu</h1>

        {/* Tabs */}
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

        {/* Food View */}
        {activeTab === 'food' && (
          <>
            <div className={styles.menuSection}>
              {Object.entries(menuData.food).map(([category, items]) => (
                <div key={category} className={styles.categoryBlock}>
                  <h3 className={styles.categoryTitle}>{category}</h3>
                  <div className={styles.itemList}>
                    {items.map((item, idx) => (
                      <div key={idx} className={styles.menuItem}>
                        <div className={styles.menuItemText}>
                          <h4 className={styles.itemName}>{item.name}</h4>
                          <p className={styles.itemDesc}>{item.description}</p>
                        </div>
                        <div className={styles.menuItemDetails}>
                          <span className={styles.itemPrice}>${item.price.toFixed(0)}</span>
                          {item.image && (
                            <div className={styles.menuItemImage}>
                              <Image src={item.image} alt={item.name} width={60} height={60} objectFit="cover" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {foodDownloadUrl && (
              <div className={styles.downloadContainer}>
                <a href={foodDownloadUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadButton}>
                  Download Full Food Menu
                </a>
              </div>
            )}
          </>
        )}

{activeTab === 'drinks' && (
  <>
    <div className={styles.menuSection}>
      {Object.entries(menuData.drink).map(([categoryGroup, subcategories]) => (
        <div key={categoryGroup} className={styles.categoryGroup}>
          {Object.entries(subcategories).map(([subcategory, items]) => (
            <div key={subcategory} className={styles.drinkCard}>
              <h3 className={styles.subcategoryTitle}>{subcategory}</h3>
              <ul className={styles.drinkList}>
                {items.map((itemName, idx) => (
                  <li key={idx} className={styles.drinkListItem}>
                    {itemName}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>

    {drinkDownloadUrl && (
      <div className={styles.downloadContainer}>
        <a href={drinkDownloadUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadButton}>
          Download Full Drink Menu
        </a>
      </div>
    )}
  </>
)}



        {/* Specials View */}
        {activeTab === 'specials' && (
          <div className={styles.specials}>
            <div className={styles.section}>
              <h2>Food Specials</h2>
              <ul className={styles.specialList}>
                {menu.foodSpecials?.map((item, idx) => (
                  <li key={idx} className={styles.specialItem}>
                    {item.image?.asset?.url && (
                      <img src={item.image.asset.url} alt={item.name} className={styles.specialImage} />
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
                      <img src={item.image.asset.url} alt={item.name} className={styles.specialImage} />
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
