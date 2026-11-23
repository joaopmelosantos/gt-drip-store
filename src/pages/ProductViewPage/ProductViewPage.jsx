import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../Layout';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import Gallery from '../../components/Gallery/Gallery';
import BuyBox from '../../components/BuyBox/BuyBox';
import ProductOptions from '../../components/ProductOptions/ProductOptions';
import Reveal from '../../components/Reveal/Reveal';
import { useCart } from '../../context/CartContext';
import { products as fallbackProducts } from '../../data/products';
import { getAllProducts, getProductById } from '../../services/productService';
import styles from './ProductViewPage.module.css';

function ProductViewPage() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(
    () =>
      fallbackProducts.find((item) => String(item.id) === String(id)) ||
      fallbackProducts[0]
  );
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      const [foundProduct, allProducts] = await Promise.all([
        getProductById(id),
        getAllProducts(),
      ]);

      if (active) {
        setProduct(foundProduct);
        setSelectedSize(
          (foundProduct.sizes && foundProduct.sizes[0]) || 'Único'
        );
        setSelectedColor(
          (foundProduct.colors && foundProduct.colors[0]) || '#1F1F1F'
        );
        const sameCategory = allProducts.filter(
          (item) =>
            String(item.id) !== String(foundProduct.id) &&
            item.category === foundProduct.category
        );

        setRecommendedProducts(
          (sameCategory.length > 0
            ? sameCategory
            : allProducts.filter(
              (item) => String(item.id) !== String(foundProduct.id)
            )
          ).slice(0, 4)
        );
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [id]);

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [{ src: product.image, bg: '#E2E3FF' }];

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
          <Link
            to={`/products?filter=${encodeURIComponent(product.category)}`}
          >
            {product.category}
          </Link>
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
              onBuy={() => addItem(product, selectedSize, selectedColor)}
            >
              {product.sizes && product.sizes.length > 0 && (
                <ProductOptions
                  title="Tamanho"
                  options={product.sizes}
                  radius="4px"
                  shape="square"
                  type="text"
                  onSelect={(val) => setSelectedSize(val)}
                />
              )}

              {product.colors && product.colors.length > 0 && (
                <ProductOptions
                  title="Cor"
                  options={product.colors}
                  shape="circle"
                  type="color"
                  onSelect={(val) => setSelectedColor(val)}
                />
              )}
            </BuyBox>
          </div>
        </Reveal>
      </div>

      <Section
        title="Produtos Relacionados"
        titleAlign="left"
        link={{
          text: 'Ver todos',
          href: `/products?filter=${encodeURIComponent(product.category)}`,
        }}
      >
        <ProductListing products={recommendedProducts} />
      </Section>
    </Layout>
  );
}

export default ProductViewPage;
