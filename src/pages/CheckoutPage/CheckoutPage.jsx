import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import styles from './CheckoutPage.module.css';

function formatMoney(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, shippingCost, discountAmount, total, clearCart } =
    useCart();
  const { user, createOrder } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || '',
    cpf: user?.cpf || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    neighborhood: user?.neighborhood || '',
    city: user?.city || '',
    cep: user?.cep || '',
    complement: user?.complement || '',
    paymentMethod: 'Cartão de Crédito',
    cardHolder: user?.name || '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (items.length === 0) {
      setErrorMsg('Seu carrinho está vazio.');
      return;
    }

    if (
      !form.name.trim() ||
      !form.cpf.trim() ||
      !form.email.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.cep.trim()
    ) {
      setErrorMsg('Preencha todos os campos obrigatórios (*).');
      return;
    }

    createOrder({
      items,
      subtotal,
      shippingCost,
      discountAmount,
      total,
      customer: {
        name: form.name.trim(),
        cpf: form.cpf.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      delivery: {
        address: form.address.trim(),
        neighborhood: form.neighborhood.trim(),
        city: form.city.trim(),
        cep: form.cep.trim(),
        complement: form.complement.trim(),
      },
      payment: {
        method: form.paymentMethod,
        cardHolder: form.cardHolder.trim() || form.name.trim(),
        cardLast4: form.cardNumber.replace(/\D/g, '').slice(-4) || '9012',
      },
    });

    clearCart();
    navigate('/checkout/success');
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className={styles.pageContainer}>
          <div className={styles.emptyBox}>
            <h1>Nenhum item no carrinho</h1>
            <p>Adicione produtos antes de finalizar a compra.</p>
            <Link to="/products" className={styles.backLink}>
              Ir para Produtos
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Finalizar Compra</h1>

        <form className={styles.checkoutGrid} onSubmit={handleSubmit}>
          <div className={styles.formsColumn}>
            {/* 1. Informações Pessoais */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Informações Pessoais</h2>
              <hr className={styles.divider} />

              <div className={styles.fieldsList}>
                <div className={styles.field}>
                  <label htmlFor="chk-name">Nome Completo *</label>
                  <input
                    id="chk-name"
                    type="text"
                    placeholder="Insira seu nome"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="chk-cpf">CPF *</label>
                  <input
                    id="chk-cpf"
                    type="text"
                    placeholder="Insira seu CPF"
                    value={form.cpf}
                    onChange={(e) => handleChange('cpf', e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="chk-email">E-mail *</label>
                  <input
                    id="chk-email"
                    type="email"
                    placeholder="Insira seu email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="chk-phone">Celular *</label>
                  <input
                    id="chk-phone"
                    type="text"
                    placeholder="Insira seu celular"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* 2. Informações de Entrega */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Informações de Entrega</h2>
              <hr className={styles.divider} />

              <div className={styles.fieldsList}>
                <div className={styles.field}>
                  <label htmlFor="chk-address">Endereço *</label>
                  <input
                    id="chk-address"
                    type="text"
                    placeholder="Insira seu endereço"
                    value={form.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="chk-neighborhood">Bairro *</label>
                  <input
                    id="chk-neighborhood"
                    type="text"
                    placeholder="Insira seu bairro"
                    value={form.neighborhood}
                    onChange={(e) =>
                      handleChange('neighborhood', e.target.value)
                    }
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="chk-city">Cidade *</label>
                  <input
                    id="chk-city"
                    type="text"
                    placeholder="Insira sua cidade"
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="chk-cep">CEP *</label>
                  <input
                    id="chk-cep"
                    type="text"
                    placeholder="Insira seu CEP"
                    value={form.cep}
                    onChange={(e) => handleChange('cep', e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="chk-complement">Complemento</label>
                  <input
                    id="chk-complement"
                    type="text"
                    placeholder="Insira complemento"
                    value={form.complement}
                    onChange={(e) => handleChange('complement', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* 3. Informações de Pagamento */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Informações de Pagamento</h2>
              <hr className={styles.divider} />

              <p className={styles.paymentSubtitle}>Forma de Pagamento</p>

              <div className={styles.paymentRadios}>
                {['Cartão de Crédito', 'Boleto Bancário'].map(
                  (method) => (
                    <label key={method} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={form.paymentMethod === method}
                        onChange={(e) =>
                          handleChange('paymentMethod', e.target.value)
                        }
                      />
                      <span>{method}</span>
                    </label>
                  )
                )}
              </div>

              {form.paymentMethod === 'Cartão de Crédito' && (
                <div className={styles.fieldsList}>
                  <div className={styles.field}>
                    <label htmlFor="chk-holder">Nome do Cartão *</label>
                    <input
                      id="chk-holder"
                      type="text"
                      placeholder="Insira o nome do Cartão"
                      value={form.cardHolder}
                      onChange={(e) =>
                        handleChange('cardHolder', e.target.value)
                      }
                    />
                  </div>

                  <div className={styles.twoCols}>
                    <div className={styles.field}>
                      <label htmlFor="chk-card">Número do Cartão *</label>
                      <input
                        id="chk-card"
                        type="text"
                        placeholder="Insira número do Cartão"
                        value={form.cardNumber}
                        onChange={(e) =>
                          handleChange('cardNumber', e.target.value)
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="chk-expiry">
                        Data de validade do Cartão *
                      </label>
                      <input
                        id="chk-expiry"
                        type="text"
                        placeholder="Insira a validade do Cartão"
                        value={form.cardExpiry}
                        onChange={(e) =>
                          handleChange('cardExpiry', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className={styles.twoCols}>
                    <div className={styles.field}>
                      <label htmlFor="chk-cvv">CVV *</label>
                      <input
                        id="chk-cvv"
                        type="text"
                        placeholder="CVV *"
                        value={form.cardCvv}
                        onChange={(e) =>
                          handleChange('cardCvv', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Finalizar Compra</h2>
              <hr className={styles.divider} />
              <div className={styles.bottomTotalRow}>
                <span>Total</span>
                <span className={styles.totalAmount}>{formatMoney(total)}</span>
              </div>
              {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
              <button type="submit" className={styles.payButton}>
                Realizar Pagamento
              </button>
            </section>
          </div>

          <aside className={styles.summaryCard}>
            <h2 className={styles.cardTitle}>RESUMO</h2>
            <hr className={styles.divider} />

            <div className={styles.summaryItems}>
              {items.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className={styles.summaryItemRow}
                >
                  <div className={styles.thumbBox}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.summaryItemInfo}>
                    <p>{item.name}</p>
                    <span>
                      Qtd: {item.quantity} · Tam: {item.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>

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

            <div className={styles.totalBox}>
              <div className={styles.totalBoxRow}>
                <span>Total</span>
                <span>{formatMoney(total)}</span>
              </div>
              <p className={styles.installmentText}>
                ou 10x de {formatMoney(total / 10)} sem juros
              </p>
            </div>

            <button type="submit" className={styles.payButton}>
              Realizar Pagamento
            </button>
          </aside>
        </form>
      </div>
    </Layout>
  );
}

export default CheckoutPage;
