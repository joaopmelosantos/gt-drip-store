import ProductCard from '../ProductCard/ProductCard';
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
        <ProductCard
          key={product.id || `${product.name}-${index}`}
          id={product.id}
          name={product.name}
          image={product.image}
          category={product.category}
          price={product.price}
          priceDiscount={product.priceDiscount}
        />
      ))}
    </div>
  );
}

export default ProductListing;
