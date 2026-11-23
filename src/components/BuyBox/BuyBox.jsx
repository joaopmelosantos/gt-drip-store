import { useState } from 'react';
import { Link } from 'react-router-dom';
import starIcon from '../../assets/star-icon.svg';
import styles from './BuyBox.module.css';

function formatPriceNumber(value) {
  return Number(value).toFixed(2).replace('.', ',');
}

// Estrela inline simples para exibir as 5 estrelas antes da nota (como no Figma)
function StarSvg({ filled }) {
  return (
    <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
      <path
        d="M7.5 0.5L9.55 4.82L14.28 5.44L10.82 8.72L11.69 13.41L7.5 11.13L3.31 13.41L4.18 8.72L0.72 5.44L5.45 4.82L7.5 0.5Z"
        fill={filled ? '#F6AA1C' : 'none'}
        stroke="#F6AA1C"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
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
  onBuy,
  children,
}) {
  const [boughtFeedback, setBoughtFeedback] = useState(false);
  const hasDiscount = typeof priceDiscount === 'number' && priceDiscount < price;
  const filledStars = Math.round(Number(stars) || 0);

  function handleBuy() {
    if (onBuy) {
      onBuy();
    }
    setBoughtFeedback(true);
    setTimeout(() => setBoughtFeedback(false), 3000);
  }

  return (
    <div className={styles.buyBox}>
      <h1 className={styles.name}>{name}</h1>
      {reference && <p className={styles.reference}>{reference}</p>}

      {(stars !== undefined || rating !== undefined) && (
        <div className={styles.ratingRow}>
          <div className={styles.starsRow} aria-hidden="true">
            {[1, 2, 3, 4, 5].map((starNum) => (
              <StarSvg key={starNum} filled={starNum <= filledStars - 1 || starNum <= 4} />
            ))}
          </div>

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
        <span className={styles.currencyPrefix}>R$</span>
        <span className={styles.priceMain}>
          {formatPriceNumber(hasDiscount ? priceDiscount : price)}
        </span>
        {hasDiscount && (
          <span className={styles.priceOld}>{formatPriceNumber(price)}</span>
        )}
      </div>

      {description && (
        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionLabel}>Descrição do produto</span>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      {children && <div className={styles.optionsArea}>{children}</div>}

      <div className={styles.buyActions}>
        <button type="button" className={styles.buyButton} onClick={handleBuy}>
          {boughtFeedback ? 'ADICIONADO!' : 'COMPRAR'}
        </button>

        {boughtFeedback && (
          <Link to="/cart" className={styles.goToCartLink}>
            Ir para o carrinho →
          </Link>
        )}
      </div>
    </div>
  );
}

export default BuyBox;
