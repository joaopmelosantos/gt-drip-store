import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../Layout';
import Section from '../../components/Section/Section';
import { products } from '../../data/products';
import styles from './ProductListingPage.module.css';

function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState('');

  // Lê o termo ?filter=... enviado pela busca do Header
  const searchFilter = (searchParams.get('filter') || '').toLowerCase();

  // Filtragem simples por nome ou categoria
  let filteredProducts = products.filter((product) => {
    if (!searchFilter) return true;
    return (
      product.name.toLowerCase().includes(searchFilter) ||
      product.category.toLowerCase().includes(searchFilter) ||
      product.brand.toLowerCase().includes(searchFilter)
    );
  });

  // Ordenação simples por preço (criando uma cópia do array com [...])
  if (sortOrder === 'lowest') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => (a.priceDiscount || a.price) - (b.priceDiscount || b.price)
    );
  } else if (sortOrder === 'highest') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => (b.priceDiscount || b.price) - (a.priceDiscount || a.price)
    );
  }

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <aside className={styles.sidebar}>
          <div className={styles.sortBox}>
            <label htmlFor="sortSelect" className={styles.sortLabel}>
              Ordenar por:
            </label>
            <select
              id="sortSelect"
              className={styles.sortSelect}
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="">Mais relevantes</option>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>
          </div>

          <div className={styles.filterBox}>
            <h2 className={styles.filterTitle}>Filtrar por</h2>
            <hr className={styles.filterDivider} />
            <p className={styles.filterHint}>
              Espaço reservado para estudo do componente{' '}
              <code>&lt;FilterGroup /&gt;</code>.
            </p>
          </div>
        </aside>

        <div className={styles.listArea}>
          <Section
            title={`Resultados${searchFilter ? ` para "${searchFilter}"` : ''} - ${filteredProducts.length} produto(s)`}
            titleAlign="left"
          >
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={styles.productCard}
                >
                  <div className={styles.productImageBox}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />
                  </div>
                  <span className={styles.productCategory}>
                    {product.category}
                  </span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.priceRow}>
                    {product.priceDiscount ? (
                      <>
                        <span className={styles.priceOld}>
                          R$ {product.price.toFixed(2)}
                        </span>
                        <span className={styles.priceCurrent}>
                          R$ {product.priceDiscount.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className={styles.priceCurrent}>
                        R$ {product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
}

export default ProductListingPage;
