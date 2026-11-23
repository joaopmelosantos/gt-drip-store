import Layout from '../Layout';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import { products } from '../../data/products';
import styles from './HomePage.module.css';

function HomePage() {
  const featuredCollections = [
    { id: 1, image: '/collection-1.png', alt: 'Coleção em destaque 1' },
    { id: 2, image: '/collection-2.png', alt: 'Coleção em destaque 2' },
    { id: 3, image: '/collection-3.png', alt: 'Coleção em destaque 3' },
  ];

  return (
    <Layout>
      {/* Bloco inicial de estudo para o futuro componente <Gallery /> */}
      <section className={styles.heroWrapper}>
        <img
          src="/home-slide-1.jpeg"
          alt="Banner principal da Digital Store"
          className={styles.heroImage}
        />
      </section>

      <Section title="Coleções em destaque" titleAlign="center">
        <div className={styles.collectionsGrid}>
          {featuredCollections.map((item) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.alt}
              className={styles.collectionImage}
            />
          ))}
        </div>
      </Section>

      <Section
        title="Produtos em alta"
        titleAlign="left"
        link={{ text: 'Ver todos', href: '/products' }}
      >
        <ProductListing products={products.slice(0, 8)} />
      </Section>
    </Layout>
  );
}

export default HomePage;
