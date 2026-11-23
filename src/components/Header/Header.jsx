import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import CartModal from '../CartModal/CartModal';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import miniCartIcon from '../../assets/mini-cart.svg';
import styles from './Header.module.css';

function Header() {
  const [searchText, setSearchText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems, isCartModalOpen, setIsCartModalOpen } = useCart();
  const { user, logout } = useAuth();

  // Executa a busca redirecionando para /products?filter=...
  function handleSearch(event) {
    event.preventDefault();
    const termo = searchText.trim();
    setMenuOpen(false);

    if (termo) {
      navigate(`/products?filter=${encodeURIComponent(termo)}`);
    } else {
      navigate('/products');
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const firstName = user ? user.name.split(' ')[0] : '';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          <Link to="/" aria-label="Ir para a página inicial" onClick={closeMenu}>
            <Logo variant="header" />
          </Link>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Pesquisar produto..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="Pesquisar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          <div className={styles.actions}>
            {user ? (
              <>
                <Link to="/profile" className={styles.userGreeting}>
                  Olá, {firstName}
                </Link>
                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={logout}
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className={styles.registerLink}>
                  Cadastre-se
                </Link>
                <Link to="/login" className={styles.loginButton}>
                  Entrar
                </Link>
              </>
            )}

            <button
              type="button"
              className={styles.cartWrapper}
              onClick={() => setIsCartModalOpen(!isCartModalOpen)}
              aria-label="Abrir carrinho de compras"
            >
              <img src={miniCartIcon} alt="Carrinho de compras" />
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </button>
          </div>
        </div>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Navegação principal"
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Produtos
          </NavLink>
          <NavLink
            to="/categories"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Categorias
          </NavLink>
          <NavLink
            to="/orders"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            Meus Pedidos
          </NavLink>

          <div className={styles.mobileActions}>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={styles.loginButton}
                  onClick={closeMenu}
                >
                  Olá, {firstName}
                </Link>
                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={styles.loginButton}
                  onClick={closeMenu}
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className={styles.registerLink}
                  onClick={closeMenu}
                >
                  Cadastre-se
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      <CartModal />
    </header>
  );
}

export default Header;
