import { useEffect, useState } from 'react';
import Layout from '../Layout';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import { getAllProducts } from '../../services/productService';
import catTshirt from '../../assets/figma/cat-tshirt.svg';
import catPants from '../../assets/figma/cat-pants.svg';
import catCap from '../../assets/figma/cat-cap.svg';
import catHeadphones from '../../assets/figma/cat-headphones.svg';
import catSneakers from '../../assets/figma/cat-sneakers.svg';
import styles from './CategoriesPage.module.css';

const categoryCards = [
  { name: 'Todos', icon: null, flipY: false },
  { name: 'Camisetas', icon: catTshirt, flipY: true },
  { name: 'Calças', icon: catPants, flipY: true },
  { name: 'Bonés', icon: catCap, flipY: false },
  { name: 'Headphones', icon: catHeadphones, flipY: true },
  { name: 'Tênis', icon: catSneakers, flipY: true },
];

function CategoriesPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const list = await getAllProducts();
      if (active) {
        setProducts(list);
        setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const visibleProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter((item) => item.category === selectedCategory);

  function countByCategory(catName) {
    if (catName === 'Todos') return products.length;
    return products.filter((item) => item.category === catName).length;
  }

  return (
    <Layout>
      <Section title="Navegue por Categorias" titleAlign="center">
        <div className={styles.categoriesGrid}>
          {categoryCards.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`${styles.categoryCard} ${
                  isActive ? styles.categoryCardActive : ''
                }`}
              >
                <div className={styles.iconCircle}>
                  {cat.icon ? (
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      className={`${styles.icon} ${
                        cat.flipY ? styles.flipIcon : ''
                      }`}
                    />
                  ) : (
                    <span className={styles.allBadge}>★</span>
                  )}
                </div>
                <span className={styles.categoryName}>{cat.name}</span>
                <span className={styles.categoryCount}>
                  {countByCategory(cat.name)} itens
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section
        title={
          selectedCategory === 'Todos'
            ? `Todos os produtos (${visibleProducts.length})`
            : `Categoria: ${selectedCategory} (${visibleProducts.length})`
        }
        titleAlign="left"
      >
        {loading ? (
          <p className={styles.loadingText}>Carregando produtos das APIs...</p>
        ) : (
          <ProductListing products={visibleProducts} columns={4} />
        )}
      </Section>
    </Layout>
  );
}

export default CategoriesPage;
