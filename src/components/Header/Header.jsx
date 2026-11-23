import { useEffect, useState } from 'react';
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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems, isCartModalOpen, setIsCartModalOpen } = useCart();
  const { user, logout } = useAuth();

  // Executa a busca redirecionando para /products?filter=...
  function handleSearch(event) {
    event.preventDefault();
    const termo = searchText.trim();
    setMenuOpen(false);
    setMobileSearchOpen(false);

    if (termo) {
      navigate(`/products?filter=${encodeURIComponent(termo)}`);
    } else {
      navigate('/products');
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const firstName = user ? user.name.split(' ')[0] : '';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <button
            type="button"
            className={styles.menuToggle}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setMobileSearchOpen(false);
            }}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          <Link
            to="/"
            className={styles.logoLink}
            aria-label="Ir para a página inicial"
            onClick={closeMenu}
          >
            <Logo variant="header" />
          </Link>

          <form
            className={`${styles.searchForm} ${
              mobileSearchOpen ? styles.searchFormOpen : ''
            }`}
            onSubmit={handleSearch}
          >
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
              <Link to="/profile" className={styles.userGreeting}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C92071"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
                </svg>
                <span>Olá {firstName}</span>
              </Link>
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
              className={`${styles.mobileSearchToggle} ${
                mobileSearchOpen ? styles.mobileSearchToggleActive : ''
              }`}
              onClick={() => {
                setMobileSearchOpen((prev) => !prev);
                setMenuOpen(false);
              }}
              aria-label="Pesquisar produtos"
              aria-expanded={mobileSearchOpen}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

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

        {menuOpen && (
          <div
            className={styles.mobileBackdrop}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          aria-label="Navegação principal"
        >
          {user && (
            <div className={styles.mobileAccountBlock}>
              <span className={styles.mobileGreetingTitle}>
                Olá {firstName}
              </span>
              <Link
                to="/profile"
                className={styles.mobileSubLink}
                onClick={closeMenu}
              >
                Minhas Informações
              </Link>
              <Link
                to="/orders"
                className={styles.mobileSubLink}
                onClick={closeMenu}
              >
                Meus Pedidos
              </Link>
              <button
                type="button"
                className={styles.mobileLogoutButton}
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Sair da conta
              </button>
              <hr className={styles.mobileDrawerDivider} />
            </div>
          )}

          <span className={styles.mobileNavHeading}>Páginas</span>

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

          {!user && (
            <div className={styles.mobileActions}>
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
            </div>
          )}
        </nav>
      </div>

      <CartModal />
    </header>
  );
}

export default Header;
