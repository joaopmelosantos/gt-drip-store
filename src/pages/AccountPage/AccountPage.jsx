import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { useAuth } from '../../context/AuthContext';
import styles from './AccountPage.module.css';

function AccountPage({ initialTab = 'orders' }) {
  const navigate = useNavigate();
  const { user, orders, updateProfile, logout } = useAuth();
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

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.accountGrid}>
          <aside className={styles.sidebarCard}>
            <nav className={styles.sideNav} aria-label="Menu da conta">
              <span className={styles.sideTitle}>Meu Perfil</span>
              <hr className={styles.divider} />
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.sideLink} ${styles.sideLinkActive}`
                    : styles.sideLink
                }
              >
                Meus Pedidos
              </NavLink>
              <hr className={styles.divider} />
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.sideLink} ${styles.sideLinkActive}`
                    : styles.sideLink
                }
              >
                Minhas Informações
              </NavLink>
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

          <section className={styles.contentCard}>
            {initialTab === 'orders' ? (
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
                                <img
                                  src={firstItem.image}
                                  alt={firstItem.name}
                                />
                              </div>
                            )}
                            <div>
                              <span className={styles.orderNumber}>
                                Pedido nº {order.id} · {order.date}
                              </span>
                              <p className={styles.orderName}>
                                {firstItem ? firstItem.name : 'Pedido'}
                                {order.items.length > 1
                                  ? ` (+${order.items.length - 1} item)`
                                  : ''}
                              </p>
                            </div>
                          </div>

                          <span className={styles.orderStatus}>
                            {order.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
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
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="prof-cpf">CPF</label>
                      <input
                        id="prof-cpf"
                        value={form.cpf}
                        onChange={(e) =>
                          setForm({ ...form, cpf: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="prof-phone">Celular</label>
                      <input
                        id="prof-phone"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="prof-addr">Endereço</label>
                      <input
                        id="prof-addr"
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="prof-city">Cidade</label>
                      <input
                        id="prof-city"
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="prof-cep">CEP</label>
                      <input
                        id="prof-cep"
                        value={form.cep}
                        onChange={(e) =>
                          setForm({ ...form, cep: e.target.value })
                        }
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
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default AccountPage;
