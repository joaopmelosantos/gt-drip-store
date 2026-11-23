import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartModal.module.css';

function formatMoney(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}

// Modal rápido do carrinho aberto ao clicar no ícone do Header (Figma Sprint 2)
function CartModal() {
  const { items, subtotal, clearCart, isCartModalOpen, setIsCartModalOpen } =
    useCart();

  if (!isCartModalOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      onClick={() => setIsCartModalOpen(false)}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label="Meu Carrinho"
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Meu Carrinho</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsCartModalOpen(false)}
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        <hr className={styles.divider} />

        {items.length === 0 ? (
          <p className={styles.emptyText}>Seu carrinho está vazio no momento.</p>
        ) : (
          <div className={styles.itemsList}>
            {items.map((item, index) => (
              <div
                key={`${item.id}-${item.size}-${item.color}-${index}`}
                className={styles.itemRow}
              >
                <div className={styles.thumbBox}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.thumbImg}
                  />
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemMeta}>
                    Tam: {item.size} · Qtd: {item.quantity}
                  </p>
                  <p className={styles.itemPrice}>
                    {formatMoney(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <hr className={styles.divider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Valor total:</span>
          <span className={styles.totalValue}>{formatMoney(subtotal)}</span>
        </div>

        <div className={styles.actionsRow}>
          <button
            type="button"
            className={styles.clearLink}
            onClick={clearCart}
            disabled={items.length === 0}
          >
            Esvaziar
          </button>

          <Link
            to="/cart"
            className={styles.viewCartButton}
            onClick={() => setIsCartModalOpen(false)}
          >
            Ver Carrinho
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
