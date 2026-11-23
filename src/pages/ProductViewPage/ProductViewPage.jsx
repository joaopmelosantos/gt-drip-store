import { Link, useParams } from 'react-router-dom';
import Layout from '../Layout';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import Gallery from '../../components/Gallery/Gallery';
import BuyBox from '../../components/BuyBox/BuyBox';
import ProductOptions from '../../components/ProductOptions/ProductOptions';
import Reveal from '../../components/Reveal/Reveal';
import { products } from '../../data/products';
import styles from './ProductViewPage.module.css';

function ProductViewPage() {
  const { id } = useParams();

  // Busca simples do produto pelo id da URL; se não encontrar, usa o primeiro
  const product =
    products.find((item) => item.id === Number(id)) || products[0];

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [{ src: product.image, bg: '#E2E3FF' }];

  // Seleciona até 4 outros produtos para exibir em "Produtos Relacionados"
  const recommendedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className={styles.pageContainer}>
        {/* Breadcrumb idêntico ao Figma */}
        <nav className={styles.breadcrumb} aria-label="Caminho do produto">
          <Link to="/" className={styles.breadcrumbStrong}>
            Home
          </Link>
          <span>/</span>
          <Link to="/products">Produtos</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.brand}</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <Reveal>
          <div className={styles.detailsGrid}>
            <Gallery
              showThumbs
              width="700px"
              height="571px"
              radius="4px"
              images={galleryImages}
            />

            <BuyBox
              name={product.name}
              reference={product.reference}
              stars={product.stars}
              rating={product.rating}
              price={product.price}
              priceDiscount={product.priceDiscount}
              description={product.description}
            >
              {product.sizes && product.sizes.length > 0 && (
                <ProductOptions
                  title="Tamanho"
                  options={product.sizes}
                  radius="4px"
                  shape="square"
                  type="text"
                />
              )}

              {product.colors && product.colors.length > 0 && (
                <ProductOptions
                  title="Cor"
                  options={product.colors}
                  shape="circle"
                  type="color"
                />
              )}
            </BuyBox>
          </div>
        </Reveal>
      </div>

      <Section
        title="Produtos Relacionados"
        titleAlign="left"
        link={{ text: 'Ver todos', href: '/products' }}
      >
        <ProductListing products={recommendedProducts} />
      </Section>
    </Layout>
  );
}

export default ProductViewPage;
