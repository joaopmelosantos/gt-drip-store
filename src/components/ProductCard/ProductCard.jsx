import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

// Formata número para moeda brasileira simples (ex.: 149.9 -> "R$ 149,90")
function formatPrice(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}

function ProductCard({ id, name, image, imagem, category, price, priceDiscount }) {
  const imageSrc = image || imagem;
  const hasDiscount = typeof priceDiscount === 'number' && priceDiscount < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - priceDiscount) / price) * 100)
    : 0;

  const cardContent = (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        {hasDiscount && discountPercent > 0 && (
          <span className={styles.discountBadge}>{discountPercent}% OFF</span>
        )}
        <img src={imageSrc} alt={name} className={styles.image} />
      </div>

      <div className={styles.info}>
        {category && <span className={styles.category}>{category}</span>}
        <h3 className={styles.name}>{name}</h3>

        <div className={styles.priceRow}>
          {hasDiscount ? (
            <>
              <span className={styles.priceOld}>{formatPrice(price)}</span>
              <span className={styles.priceDiscount}>
                {formatPrice(priceDiscount)}
              </span>
            </>
          ) : (
            <span className={styles.price}>{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </article>
  );

  // Se o produto tiver id, envolve o cartão com Link para a página de detalhes
  if (id) {
    return (
      <Link to={`/product/${id}`} className={styles.cardLink}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default ProductCard;
