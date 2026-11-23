import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import Section from '../../components/Section/Section';
import ProductListing from '../../components/ProductListing/ProductListing';
import { useCart } from '../../context/CartContext';
import { getAllProducts } from '../../services/productService';
import styles from './CartPage.module.css';

function formatMoney(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}

function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    shippingCost,
    shippingMessage,
    couponCode,
    couponMessage,
    discountAmount,
    total,
    cep,
    updateQuantity,
    removeItem,
    applyCoupon,
    calculateShipping,
  } = useCart();

  const [couponInput, setCouponInput] = useState(couponCode || '');
  const [cepInput, setCepInput] = useState(cep || '');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    let active = true;
    getAllProducts().then((list) => {
      if (active) setRelatedProducts(list.slice(0, 4));
    });
    return () => {
      active = false;
    };
  }, []);

  function handleCouponSubmit(event) {
    event.preventDefault();
    applyCoupon(couponInput);
  }

  function handleCepSubmit(event) {
    event.preventDefault();
    calculateShipping(cepInput);
  }

  return (
    <Layout>
      <div className={styles.pageContainer}>
        {items.length === 0 ? (
          <div className={styles.emptyCard}>
            <h1 className={styles.emptyTitle}>Seu carrinho está vazio</h1>
            <p className={styles.emptySubtitle}>
              Explore nossos produtos e adicione itens para continuar sua compra.
            </p>
            <Link to="/products" className={styles.exploreButton}>
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            <div className={styles.cartCard}>
              <div className={styles.tableHeader}>
                <span className={styles.colProduct}>MEU CARRINHO</span>
                <span className={styles.colCenter}>QUANTIDADE</span>
                <span className={styles.colRight}>UNITÁRIO</span>
                <span className={styles.colRight}>TOTAL</span>
              </div>

              <hr className={styles.divider} />

              <div className={styles.itemsList}>
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}-${index}`}
                    className={styles.itemRow}
                  >
                    <div className={styles.productInfo}>
                      <div className={styles.thumbBox}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.thumbImg}
                        />
                      </div>
                      <div className={styles.productText}>
                        <Link
                          to={`/product/${item.id}`}
                          className={styles.productName}
                        >
                          {item.name}
                        </Link>
                        <div className={styles.metaRow}>
                          <span>Cor:</span>
                          <span
                            className={styles.colorSwatch}
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                        <div className={styles.metaRow}>
                          <span>Tamanho:</span>
                          <strong>{item.size}</strong>
                        </div>
                      </div>
                    </div>

                    <div className={styles.quantityCol}>
                      <div className={styles.qtyControls}>
                        <button
                          type="button"
                          className={styles.qtyButton}
                          onClick={() => updateQuantity(index, -1)}
                          aria-label="Diminuir quantidade"
                        >
                          -
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button
                          type="button"
                          className={styles.qtyButton}
                          onClick={() => updateQuantity(index, 1)}
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() => removeItem(index)}
                      >
                        Remover item
                      </button>
                    </div>

                    <div className={styles.priceCol}>
                      {item.oldPrice > item.price && (
                        <span className={styles.oldPrice}>
                          {formatMoney(item.oldPrice)}
                        </span>
                      )}
                      <span className={styles.unitPrice}>
                        {formatMoney(item.price)}
                      </span>
                    </div>

                    <div className={styles.priceCol}>
                      <span className={styles.totalItemPrice}>
                        {formatMoney(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <hr className={styles.divider} />

              <div className={styles.formsRow}>
                <form
                  className={styles.miniForm}
                  onSubmit={handleCouponSubmit}
                >
                  <label htmlFor="couponInput" className={styles.miniLabel}>
                    Cupom de desconto (teste DRIP10 ou DRIP30)
                  </label>
                  <div className={styles.inputRow}>
                    <input
                      id="couponInput"
                      type="text"
                      className={styles.textInput}
                      placeholder="Insira seu código"
                      value={couponInput}
                      onChange={(event) => setCouponInput(event.target.value)}
                    />
                    <button type="submit" className={styles.okButton}>
                      OK
                    </button>
                  </div>
                  {couponMessage && (
                    <span className={styles.helperText}>{couponMessage}</span>
                  )}
                </form>

                <form className={styles.miniForm} onSubmit={handleCepSubmit}>
                  <label htmlFor="cepInput" className={styles.miniLabel}>
                    Calcular frete
                  </label>
                  <div className={styles.inputRow}>
                    <input
                      id="cepInput"
                      type="text"
                      className={styles.textInput}
                      placeholder="Insira seu CEP"
                      value={cepInput}
                      onChange={(event) => setCepInput(event.target.value)}
                    />
                    <button type="submit" className={styles.okButton}>
                      OK
                    </button>
                  </div>
                  {shippingMessage && (
                    <span className={styles.helperText}>{shippingMessage}</span>
                  )}
                </form>
              </div>
            </div>

            <aside className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>RESUMO</h2>
              <hr className={styles.divider} />

              <div className={styles.summaryRow}>
                <span>Subtotal:</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Frete:</span>
                <strong>{formatMoney(shippingCost)}</strong>
              </div>
              <div className={styles.summaryRow}>
                <span>Desconto:</span>
                <strong>{formatMoney(discountAmount)}</strong>
              </div>

              <hr className={styles.divider} />

              <div className={styles.totalSummaryRow}>
                <span>Total</span>
                <span className={styles.totalAmount}>{formatMoney(total)}</span>
              </div>
              <p className={styles.installmentText}>
                ou 10x de {formatMoney(total / 10)} sem juros
              </p>

              <button
                type="button"
                className={styles.continueButton}
                onClick={() => navigate('/checkout')}
              >
                Continuar
              </button>
            </aside>
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <Section
          title="Produtos Relacionados"
          titleAlign="left"
          link={{ text: 'Ver todos', href: '/products' }}
        >
          <ProductListing products={relatedProducts} />
        </Section>
      )}
    </Layout>
  );
}

export default CartPage;
