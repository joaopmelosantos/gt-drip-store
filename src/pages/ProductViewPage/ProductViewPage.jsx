import { useParams } from 'react-router-dom';
import Layout from '../Layout';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import { products } from '../../data/products';
import starIcon from '../../assets/star-icon.svg';
import styles from './ProductViewPage.module.css';

function ProductViewPage() {
  const { id } = useParams();

  // Busca simples do produto pelo id da URL; se não encontrar, usa o primeiro
  const product =
    products.find((item) => item.id === Number(id)) || products[0];

  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0].src
      : product.image;

  // Seleciona até 4 outros produtos para exibir em "Produtos recomendados"
  const recommendedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.detailsGrid}>
          <div className={styles.galleryPlaceholder}>
            <img
              src={mainImage}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>

          <div className={styles.buyBoxPlaceholder}>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.reference}>{product.reference}</p>

            <div className={styles.ratingRow}>
              <span className={styles.starsBadge}>
                {product.stars}
                <img src={starIcon} alt="Estrela" className={styles.starIcon} />
              </span>
              <span className={styles.ratingCount}>
                ({product.rating} avaliações)
              </span>
            </div>

            <div className={styles.priceRow}>
              {product.priceDiscount ? (
                <>
                  <span className={styles.priceCurrent}>
                    R$ {product.priceDiscount.toFixed(2)}
                  </span>
                  <span className={styles.priceOld}>
                    R$ {product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className={styles.priceCurrent}>
                  R$ {product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            <button type="button" className={styles.buyButton}>
              COMPRAR
            </button>
          </div>
        </div>
      </div>

      <Section
        title="Produtos recomendados"
        titleAlign="left"
        link={{ text: 'Ver todos', href: '/products' }}
      >
        <ProductListing products={recommendedProducts} />
      </Section>
    </Layout>
  );
}

export default ProductViewPage;
