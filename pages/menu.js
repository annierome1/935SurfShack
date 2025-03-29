// pages/Menu.js
import { useState } from 'react';
import Layout from '../components/Layout';
import PDFViewer from '../components/PDFViewer';
import styles from '../styles/components/menu.module.css';
import { client } from '../src/sanity/lib/client';



function Menu({ menu }) {
  const [activeTab, setActiveTab] = useState('food');

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Our Menu</h1>
        
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === 'food' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('food')}
          >
            Food
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'drink' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('drink')}
          >
            Drink
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'specials' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('specials')}
          >
            Specials
          </button>
        </div>

        {activeTab === 'food' && (
          <div className={styles.menuContent}>
            {menu.menuPdf?.asset?.url ? (
              <PDFViewer pdfUrl={menu.menuPdf.asset.url} />
            ) : (
              <p>Full menu is not available at this time.</p>
            )}
          </div>
        )}

        {activeTab === 'drink' && (
          <div className={styles.menuContent}>
            {menu.drinkPdf?.asset?.url ? (
              <PDFViewer pdfUrl={menu.drinkPdf.asset.url} />
            ) : (
              <p>Drink menu is not available at this time.</p>
            )}
          </div>
        )}

        {activeTab === 'specials' && (
          <div className={styles.specials}>
            <div className={styles.section}>
              <h2>Food Specials</h2>
              <ul>
                {menu.foodSpecials?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h2>Drink Specials</h2>
              <ul>
                {menu.drinkSpecials?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const query = `*[_type == "menu"][0]{
    menuPdf {
      asset-> {
        url
      }
    },
    drinkPdf {
      asset-> {
        url
      }
    },
    foodSpecials,
    drinkSpecials
  }`;

  const menu = await client.fetch(query);

  return {
    props: { menu },
    revalidate: 60,
  };
}

export default Menu;
