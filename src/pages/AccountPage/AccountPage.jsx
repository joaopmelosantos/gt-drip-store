import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { useAuth } from '../../context/AuthContext';
import styles from './AccountPage.module.css';

function AccountPage({ initialTab = 'orders' }) {
  const navigate = useNavigate();
  const { user, orders, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [editing, setEditing] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    cpf: user?.cpf || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    neighborhood: user?.neighborhood || '',
    city: user?.city || '',
    cep: user?.cep || '',
  });

  useEffect(() => {
    setActiveTab(initialTab);
    setEditing(false);
  }, [initialTab]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        cpf: user.cpf || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        neighborhood: user.neighborhood || '',
        city: user.city || '',
        cep: user.cep || '',
      });
    }
  }, [user]);

  function handleSave(event) {
    event.preventDefault();
    updateProfile(form);
    setEditing(false);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  // Filtra pedidos da conta logada (ou exibe todos os pedidos feitos no navegador)
  const visibleOrders = user
    ? orders.filter((ord) => ord.userEmail === user.email)
    : orders;

  const recentCardOrder = visibleOrders.find(
    (ord) => ord.payment?.method === 'Cartão de Crédito'
  );

  function renderMainContent() {
    if (activeTab === 'summary') {
      return (
        <>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Meu Perfil</h1>
          </div>
          <hr className={styles.divider} />

          {!user ? (
            <div className={styles.emptyBox}>
              <p>Entre na sua conta para acompanhar pedidos e gerenciar dados.</p>
              <div className={styles.authLinksRow}>
                <Link to="/login" className={styles.ctaButton}>
                  Entrar
                </Link>
                <Link to="/register" className={styles.secondaryButton}>
                  Criar Conta
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.infoSections}>
              <div className={styles.infoBlock}>
                <h2>Resumo da Conta</h2>
                <p>
                  <span>Cliente:</span> {user.name}
                </p>
                <p>
                  <span>Email:</span> {user.email}
                </p>
                <p>
                  <span>Total de pedidos:</span> {visibleOrders.length}
                </p>
              </div>
              <div className={styles.authLinksRow}>
                <button
                  type="button"
                  className={styles.ctaButton}
                  onClick={() => setActiveTab('orders')}
                >
                  Ver Meus Pedidos
                </button>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setActiveTab('profile')}
                >
                  Editar Dados
                </button>
              </div>
            </div>
          )}
        </>
      );
    }

    if (activeTab === 'orders') {
      return (
        <>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Meus Pedidos</h1>
            <span className={styles.statusHeader}>STATUS</span>
          </div>
          <hr className={styles.divider} />

          {visibleOrders.length === 0 ? (
            <div className={styles.emptyBox}>
              <p>Você ainda não realizou nenhum pedido.</p>
              <Link to="/products" className={styles.ctaButton}>
                Explorar Produtos
              </Link>
            </div>
          ) : (
            <div className={styles.ordersList}>
              {visibleOrders.map((order) => {
                const firstItem = order.items[0];
                return (
                  <div key={order.id} className={styles.orderRow}>
                    <div className={styles.orderProduct}>
                      {firstItem && (
                        <div className={styles.thumbBox}>
                          <img src={firstItem.image} alt={firstItem.name} />
                        </div>
                      )}
                      <div>
                        <span className={styles.orderNumber}>
                          Pedido nº {order.id}
                        </span>
                        <p className={styles.orderName}>
                          {firstItem ? firstItem.name : 'Pedido'}
                          {order.items.length > 1
                            ? ` (+${order.items.length - 1} item)`
                            : ''}
                        </p>
                      </div>
                    </div>

                    <span className={styles.orderStatus}>{order.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      );
    }

    if (activeTab === 'payment') {
      return (
        <>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Métodos de Pagamento</h1>
          </div>
          <hr className={styles.divider} />

          {recentCardOrder ? (
            <div className={styles.infoSections}>
              <div className={styles.infoBlock}>
                <h2>Cartão Utilizado Recentemente</h2>
                <p>
                  <span>Titular:</span> {recentCardOrder.payment.cardHolder}
                </p>
                <p>
                  <span>Número:</span> **** **** ****{' '}
                  {recentCardOrder.payment.cardLast4}
                </p>
                <p>
                  <span>Bandeira:</span> Cartão de Crédito
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.emptyBox}>
              <p>
                Nenhum cartão salvo no momento. Seus dados do último cartão
                utilizado no checkout ficam disponíveis aqui.
              </p>
              <Link to="/products" className={styles.ctaButton}>
                Ir às Compras
              </Link>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>Minhas Informações</h1>
          {user && !editing && (
            <button
              type="button"
              className={styles.editButton}
              onClick={() => setEditing(true)}
            >
              Editar
            </button>
          )}
        </div>
        <hr className={styles.divider} />

        {!user ? (
          <div className={styles.emptyBox}>
            <p>Faça login ou crie sua conta para salvar seus dados.</p>
            <div className={styles.authLinksRow}>
              <Link to="/login" className={styles.ctaButton}>
                Entrar
              </Link>
              <Link to="/register" className={styles.secondaryButton}>
                Criar Conta
              </Link>
            </div>
          </div>
        ) : editing ? (
          <form className={styles.editForm} onSubmit={handleSave}>
            <div className={styles.field}>
              <label htmlFor="prof-name">Nome</label>
              <input
                id="prof-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="prof-cpf">CPF</label>
              <input
                id="prof-cpf"
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="prof-phone">Celular</label>
              <input
                id="prof-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="prof-addr">Endereço</label>
              <input
                id="prof-addr"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="prof-neighborhood">Bairro</label>
              <input
                id="prof-neighborhood"
                value={form.neighborhood}
                onChange={(e) =>
                  setForm({ ...form, neighborhood: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="prof-city">Cidade</label>
              <input
                id="prof-city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="prof-cep">CEP</label>
              <input
                id="prof-cep"
                value={form.cep}
                onChange={(e) => setForm({ ...form, cep: e.target.value })}
              />
            </div>
            <div className={styles.formButtons}>
              <button type="submit" className={styles.ctaButton}>
                Salvar alterações
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.infoSections}>
            {savedFeedback && (
              <p className={styles.savedNotice}>
                Informações atualizadas com sucesso!
              </p>
            )}

            <div className={styles.infoBlock}>
              <h2>Informações Pessoais</h2>
              <p>
                <span>Nome:</span> {user.name}
              </p>
              <p>
                <span>CPF:</span> {user.cpf}
              </p>
              <p>
                <span>Email:</span> {user.email}
              </p>
              <p>
                <span>Celular:</span> {user.phone}
              </p>
            </div>

            <hr className={styles.divider} />

            <div className={styles.infoBlock}>
              <h2>Informações de Entrega</h2>
              <p>
                <span>Endereço:</span> {user.address}
              </p>
              <p>
                <span>Bairro:</span> {user.neighborhood}
              </p>
              <p>
                <span>Cidade:</span> {user.city}
              </p>
              <p>
                <span>CEP:</span> {user.cep}
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.accountGrid}>
          <aside className={styles.sidebarCard}>
            <nav className={styles.sideNav} aria-label="Menu da conta">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('summary');
                  setEditing(false);
                }}
                className={
                  activeTab === 'summary'
                    ? `${styles.sideLink} ${styles.sideLinkActive}`
                    : styles.sideLink
                }
              >
                Meu Perfil
              </button>
              <hr className={styles.divider} />
              <button
                type="button"
                onClick={() => {
                  setActiveTab('orders');
                  setEditing(false);
                  navigate('/orders');
                }}
                className={
                  activeTab === 'orders'
                    ? `${styles.sideLink} ${styles.sideLinkActive}`
                    : styles.sideLink
                }
              >
                Meus Pedidos
              </button>
              <hr className={styles.divider} />
              <button
                type="button"
                onClick={() => {
                  setActiveTab('profile');
                  setEditing(false);
                  navigate('/profile');
                }}
                className={
                  activeTab === 'profile'
                    ? `${styles.sideLink} ${styles.sideLinkActive}`
                    : styles.sideLink
                }
              >
                Minhas Informações
              </button>
              <hr className={styles.divider} />
              <button
                type="button"
                onClick={() => {
                  setActiveTab('payment');
                  setEditing(false);
                }}
                className={
                  activeTab === 'payment'
                    ? `${styles.sideLink} ${styles.sideLinkActive}`
                    : styles.sideLink
                }
              >
                Métodos de Pagamento
              </button>
              {user && (
                <>
                  <hr className={styles.divider} />
                  <button
                    type="button"
                    className={styles.logoutLink}
                    onClick={handleLogout}
                  >
                    Sair da conta
                  </button>
                </>
              )}
            </nav>
          </aside>

          <section className={styles.contentCard}>{renderMainContent()}</section>
        </div>
      </div>
    </Layout>
  );
}

export default AccountPage;
