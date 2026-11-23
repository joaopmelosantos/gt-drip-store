import ProductCard from '../ProductCard/ProductCard';
import Reveal from '../Reveal/Reveal';
import styles from './ProductListing.module.css';

// Encapsula e renderiza uma lista de <ProductCard /> a partir do array products
function ProductListing({ products = [], columns = 4 }) {
  if (products.length === 0) {
    return (
      <p className={styles.emptyMessage}>
        Nenhum produto encontrado para os critérios selecionados.
      </p>
    );
  }

  const gridClass =
    columns === 3 ? `${styles.grid} ${styles.gridThree}` : styles.grid;

  return (
    <div className={gridClass}>
      {products.map((product, index) => (
        <Reveal
          key={product.id || `${product.name}-${index}`}
          delay={Math.min(index * 45, 320)}
        >
          <ProductCard
            id={product.id}
            name={product.name}
            image={product.image}
            category={product.category}
            price={product.price}
            priceDiscount={product.priceDiscount}
            showDiscountBadge={product.showDiscountBadge}
            discountText={product.discountText}
          />
        </Reveal>
      ))}
    </div>
  );
}

export default ProductListing;
