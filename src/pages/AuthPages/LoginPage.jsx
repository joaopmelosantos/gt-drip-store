import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPages.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login, loginSocialDemo } = useAuth();
  const [emailOrLogin, setEmailOrLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [recoveryMsg, setRecoveryMsg] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setRecoveryMsg('');
    const result = login(emailOrLogin, password);

    if (!result.ok) {
      setErrorMsg(result.error);
      return;
    }

    navigate('/');
  }

  function handleForgotPassword() {
    setErrorMsg('');
    setRecoveryMsg(
      'Enviamos um link de redefinição de senha para o e-mail informado.'
    );
  }

  function handleSocialLogin(provider) {
    if (typeof loginSocialDemo === 'function') {
      loginSocialDemo(provider);
      navigate('/');
    } else {
      navigate('/register');
    }
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
            <div className={styles.cardTitleGroup}>
              <h1 className={styles.title}>Acesse sua conta</h1>
              <p className={styles.subtitle}>
                Novo cliente? Então registre-se{' '}
                <Link to="/register" className={styles.inlineLink}>
                  aqui
                </Link>
                .
              </p>
            </div>

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

            <button
              type="button"
              className={styles.forgotLink}
              onClick={handleForgotPassword}
            >
              Esqueci minha senha
            </button>

            {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
            {recoveryMsg && <p className={styles.infoText}>{recoveryMsg}</p>}

            <button type="submit" className={styles.primaryButton}>
              Acessar Conta
            </button>

            <div className={styles.socialRow}>
              <span>Ou faça login com</span>
              <div className={styles.socialIcons}>
                <button
                  type="button"
                  className={styles.socialButton}
                  onClick={() => handleSocialLogin('Google')}
                  aria-label="Entrar com Gmail"
                  title="Entrar com Gmail"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#EA4335"
                      d="M5.26 9.77v9.98H2.25A2.25 2.25 0 0 1 0 17.5V6.73l5.26 3.04z"
                    />
                    <path
                      fill="#4285F4"
                      d="M18.74 9.77v9.98h3.01A2.25 2.25 0 0 0 24 17.5V6.73l-5.26 3.04z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M18.74 4.25v5.52L24 6.73v-.98a2.25 2.25 0 0 0-3.6-1.8l-1.66.3z"
                    />
                    <path
                      fill="#C5221F"
                      d="M5.26 4.25 12 9.3l6.74-5.05V9.77L12 14.82 5.26 9.77V4.25z"
                    />
                    <path
                      fill="#34A853"
                      d="M0 5.75v.98l5.26 3.04V4.25L3.6 3.95A2.25 2.25 0 0 0 0 5.75z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.socialButton}
                  onClick={() => handleSocialLogin('Facebook')}
                  aria-label="Entrar com Facebook"
                  title="Entrar com Facebook"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <path
                      fill="#FFFFFF"
                      d="M15.12 15.53 15.65 12h-3.38V9.71c0-.97.47-1.91 1.99-1.91h1.54V4.8s-1.4-.24-2.73-.24c-2.79 0-4.61 1.69-4.61 4.75V12H5.35v3.53h3.11V24h3.81v-8.47h2.85z"
                    />
                  </svg>
                </button>
              </div>
            </div>
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
