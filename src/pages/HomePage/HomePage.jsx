import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import Gallery from '../../components/Gallery/Gallery';
import Reveal from '../../components/Reveal/Reveal';
import { products } from '../../data/products';
import catTshirt from '../../assets/figma/cat-tshirt.svg';
import catPants from '../../assets/figma/cat-pants.svg';
import catCap from '../../assets/figma/cat-cap.svg';
import catHeadphones from '../../assets/figma/cat-headphones.svg';
import catSneakers from '../../assets/figma/cat-sneakers.svg';
import styles from './HomePage.module.css';

function HomePage() {
  const heroSlides = [
    {
      eyebrow: 'Melhores ofertas personalizadas',
      title: 'Queima de stoque Nike 🔥',
      description:
        'Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.',
      buttonText: 'Ver Ofertas',
      buttonHref: '/products',
      src: '/figma/nike-white-red.png',
      ornament: '/figma/ornament-dots.svg',
    },
    {
      eyebrow: 'Coleção exclusiva 2026',
      title: 'K-Swiss V8 Edição Limitada',
      description:
        'Conforto e design urbano com até 30% de desconto em modelos selecionados.',
      buttonText: 'Ver Ofertas',
      buttonHref: '/products?filter=K-Swiss',
      src: '/figma/kswiss-v8.png',
      ornament: '/figma/ornament-dots.svg',
    },
    {
      eyebrow: 'Oferta especial de lançamento',
      title: 'Air Jordan Colecionador',
      description:
        'Edição especial com acabamento premium e estoque limitado na Digital Store.',
      buttonText: 'Ver Oferta',
      buttonHref: '/product/1',
      src: '/figma/air-jordan.png',
      ornament: '/figma/ornament-dots.svg',
    },
    {
      eyebrow: 'Novidades da temporada',
      title: 'Esporte & Estilo Urbano',
      description:
        'Confira os tênis mais procurados com entrega rápida para todo o Brasil.',
      buttonText: 'Explorar',
      buttonHref: '/products',
      src: '/figma/nike-white-red.png',
      ornament: '/figma/ornament-dots.svg',
    },
  ];

  const featuredCollections = [
    {
      id: 1,
      image: '/collection-1.png',
      alt: 'Novo drop Supreme',
      discount: '30% OFF',
      href: '/products?filter=Camisetas',
    },
    {
      id: 2,
      image: '/collection-2.png',
      alt: 'Coleção Adidas',
      discount: '30% OFF',
      href: '/products?filter=Adidas',
    },
    {
      id: 3,
      image: '/collection-3.png',
      alt: 'Novo Beats Bass',
      discount: '30% OFF',
      href: '/products?filter=Beats',
    },
  ];

  const categoryShortcuts = [
    { name: 'Camisetas', icon: catTshirt, flipY: true, active: true },
    { name: 'Calças', icon: catPants, flipY: true },
    { name: 'Bonés', icon: catCap, flipY: false },
    { name: 'Headphones', icon: catHeadphones, flipY: true },
    { name: 'Tênis', icon: catSneakers, flipY: true },
  ];

  return (
    <Layout>
      {/* 1. Banner Hero com carrossel por bolinhas (idêntico ao Figma) */}
      <div className={styles.heroFullWidth}>
        <Gallery
          width="100%"
          height="681px"
          images={heroSlides}
          showDots
          showArrows={false}
        />
      </div>

      {/* 2. Coleções em destaque (3 cards azuis) */}
      <Reveal>
        <Section title="Coleções em destaque" titleAlign="left">
          <div className={styles.collectionsGrid}>
            {featuredCollections.map((item) => (
              <div key={item.id} className={styles.collectionCard}>
                <img
                  src={item.image}
                  alt={item.alt}
                  className={styles.collectionImage}
                />
                <span className={styles.collectionBadge}>{item.discount}</span>
                <Link to={item.href} className={styles.collectionButton}>
                  Comprar
                </Link>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* 3. Coleções em destaque (5 ícones circulares) */}
      <Reveal delay={80}>
        <Section title="Coleções em destaque" titleAlign="center">
          <div className={styles.categoriesRow}>
            {categoryShortcuts.map((category) => (
              <Link
                key={category.name}
                to={`/products?filter=${encodeURIComponent(category.name)}`}
                className={styles.categoryItem}
              >
                <div
                  className={`${styles.categoryCircle} ${
                    category.active ? styles.categoryCircleActive : ''
                  }`}
                >
                  <img
                    src={category.icon}
                    alt={category.name}
                    className={`${styles.categoryIcon} ${
                      category.flipY ? styles.flipIcon : ''
                    }`}
                  />
                </div>
                <span className={styles.categoryLabel}>{category.name}</span>
              </Link>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* 4. Produtos em alta (8 cartões) */}
      <Section
        title="Produtos em alta"
        titleAlign="left"
        link={{ text: 'Ver todos', href: '/products' }}
      >
        <ProductListing products={products.slice(0, 8)} />
      </Section>

      {/* 5. Oferta especial — Air Jordan edição de colecionador */}
      <Reveal>
        <section className={styles.specialOfferSection}>
          <div className={styles.specialOfferInner}>
            <div className={styles.specialOfferVisual}>
              <img
                src="/figma/offer-ellipse.svg"
                alt=""
                aria-hidden="true"
                className={styles.offerEllipse}
              />
              <img
                src="/figma/air-jordan.png"
                alt="Air Jordan edição de colecionador"
                className={styles.offerImage}
              />
            </div>

            <div className={styles.specialOfferContent}>
              <span className={styles.offerEyebrow}>Oferta especial</span>
              <h2 className={styles.offerTitle}>
                Air Jordan edição de colecionador
              </h2>
              <p className={styles.offerDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip
              </p>
              <Link to="/product/1" className={styles.offerButton}>
                Ver Oferta
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </Layout>
  );
}

export default HomePage;
