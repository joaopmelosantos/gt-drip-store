import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import miniCartIcon from '../../assets/mini-cart.svg';
import styles from './Header.module.css';

function Header() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  // Executa a busca redirecionando para /products?filter=...
  function handleSearch(event) {
    event.preventDefault();
    const termo = searchText.trim();

    if (termo) {
      navigate(`/products?filter=${encodeURIComponent(termo)}`);
    } else {
      navigate('/products');
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <Link to="/" aria-label="Ir para a página inicial">
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
            <Link to="/register" className={styles.registerLink}>
              Cadastre-se
            </Link>
            <Link to="/login" className={styles.loginButton}>
              Entrar
            </Link>
            <div className={styles.cartWrapper}>
              <img src={miniCartIcon} alt="Carrinho de compras" />
            </div>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Navegação principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Produtos
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Categorias
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Meus Pedidos
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
