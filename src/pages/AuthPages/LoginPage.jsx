import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPages.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [emailOrLogin, setEmailOrLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const result = login(emailOrLogin, password);

    if (!result.ok) {
      setErrorMsg(result.error);
      return;
    }

    navigate('/');
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.simpleHeader}>
        <div className={styles.headerInner}>
          <Link to="/" aria-label="Voltar para Home">
            <Logo variant="header" />
          </Link>
        </div>
      </header>

      <main className={styles.gradientArea}>
        <div className={styles.loginContainer}>
          <form className={styles.authCard} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Acesse sua conta</h1>
            <p className={styles.subtitle}>
              Novo cliente? Então registre-se{' '}
              <Link to="/register" className={styles.inlineLink}>
                aqui
              </Link>
              .
            </p>

            <div className={styles.field}>
              <label htmlFor="login-user">Login *</label>
              <input
                id="login-user"
                type="text"
                placeholder="Insira seu login ou email"
                value={emailOrLogin}
                onChange={(e) => setEmailOrLogin(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="login-pass">Senha *</label>
              <input
                id="login-pass"
                type="password"
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

            <button type="submit" className={styles.primaryButton}>
              Acessar Conta
            </button>
          </form>

          <div className={styles.showcaseVisual} aria-hidden="true">
            <img
              src="/figma/nike-white-red.png"
              alt=""
              className={styles.shoeTop}
            />
            <img
              src="/figma/air-jordan.png"
              alt=""
              className={styles.shoeBottom}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LoginPage;
