import { useState } from 'react';
import starIcon from '../../assets/star-icon.svg';
import styles from './BuyBox.module.css';

function formatPrice(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}

// Caixa principal de compra com nome, avaliação, preço, descrição, variações e botão COMPRAR
function BuyBox({
  name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  children,
}) {
  const [boughtFeedback, setBoughtFeedback] = useState(false);
  const hasDiscount = typeof priceDiscount === 'number' && priceDiscount < price;

  function handleBuy() {
    setBoughtFeedback(true);
    setTimeout(() => setBoughtFeedback(false), 2500);
  }

  return (
    <div className={styles.buyBox}>
      <h1 className={styles.name}>{name}</h1>
      {reference && <p className={styles.reference}>{reference}</p>}

      {(stars !== undefined || rating !== undefined) && (
        <div className={styles.ratingRow}>
          {stars !== undefined && (
            <span className={styles.starsBadge}>
              {stars}
              <img src={starIcon} alt="Estrela" className={styles.starIcon} />
            </span>
          )}
          {rating !== undefined && (
            <span className={styles.ratingText}>({rating} avaliações)</span>
          )}
        </div>
      )}

      <div className={styles.priceRow}>
        {hasDiscount ? (
          <>
            <span className={styles.priceMain}>
              {formatPrice(priceDiscount)}
            </span>
            <span className={styles.priceOld}>{formatPrice(price)}</span>
          </>
        ) : (
          <span className={styles.priceMain}>{formatPrice(price)}</span>
        )}
      </div>

      {description && (
        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionLabel}>Descrição do produto</span>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      {children && <div className={styles.optionsArea}>{children}</div>}

      <button type="button" className={styles.buyButton} onClick={handleBuy}>
        {boughtFeedback ? 'ADICIONADO!' : 'COMPRAR'}
      </button>
    </div>
  );
}

export default BuyBox;
