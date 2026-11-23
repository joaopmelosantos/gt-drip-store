import { Link } from 'react-router-dom';
import Layout from '../Layout';
import { useAuth } from '../../context/AuthContext';
import styles from './OrderSuccessPage.module.css';

function formatMoney(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}

function OrderSuccessPage() {
  const { lastOrder, orders } = useAuth();
  const order = lastOrder || orders[0];

  if (!order) {
    return (
      <Layout>
        <div className={styles.pageContainer}>
          <div className={styles.card}>
            <h1 className={styles.title}>Nenhum pedido recente encontrado</h1>
            <Link to="/" className={styles.homeButton}>
              Voltar para Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.card}>
          <div className={styles.heroHeader}>
            <span className={styles.celebrationIcon} aria-hidden="true">
              🎉
            </span>
            <h1 className={styles.title}>
              Compra Realizada com sucesso!
            </h1>
            <p className={styles.orderId}>
              Pedido <strong>#{order.id}</strong> · {order.date}
            </p>
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoBlock}>
            <h2>Informações Pessoais</h2>
            <p>
              <span>Nome:</span> {order.customer.name}
            </p>
            <p>
              <span>CPF:</span> {order.customer.cpf}
            </p>
            <p>
              <span>Email:</span> {order.customer.email}
            </p>
            <p>
              <span>Celular:</span> {order.customer.phone}
            </p>
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoBlock}>
            <h2>Informações de Entrega</h2>
            <p>
              <span>Endereço:</span> {order.delivery.address}
            </p>
            <p>
              <span>Bairro:</span> {order.delivery.neighborhood}
            </p>
            <p>
              <span>Cidade:</span> {order.delivery.city}
            </p>
            <p>
              <span>CEP:</span> {order.delivery.cep}
            </p>
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoBlock}>
            <h2>Informações de Pagamento</h2>
            <p>
              <span>Forma:</span> {order.payment.method}
            </p>
            {order.payment.method === 'Cartão de Crédito' && (
              <>
                <p>
                  <span>Titular do Cartão:</span> {order.payment.cardHolder}
                </p>
                <p>
                  <span>Final:</span> **** **** **** {order.payment.cardLast4}
                </p>
              </>
            )}
          </div>

          <hr className={styles.divider} />

          <div className={styles.infoBlock}>
            <h2>Resumo da compra</h2>
            <div className={styles.itemsList}>
              {order.items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className={styles.itemRow}>
                  <div className={styles.thumbBox}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <p className={styles.itemName}>{item.name}</p>
                    <span className={styles.itemMeta}>
                      Qtd: {item.quantity} · Tam: {item.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.totalBox}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>{formatMoney(order.total)}</span>
            </div>
            <p className={styles.installment}>
              ou 10x de {formatMoney(order.total / 10)} sem juros
            </p>
          </div>

          <div className={styles.actionsRow}>
            <Link to="/orders" className={styles.ordersLink}>
              Ver Meus Pedidos
            </Link>
            <Link to="/" className={styles.homeButton}>
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderSuccessPage;
