import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPages.module.css';

function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser, loginSocialDemo } = useAuth();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    neighborhood: '',
    city: '',
    cep: '',
    complement: '',
    newsletter: true,
  });

  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Etapa 1 do Figma: "Crie sua conta" apenas com Email -> avança para o formulário completo
  function handleInitialEmailSubmit(event) {
    event.preventDefault();
    if (!form.email.trim()) {
      setErrorMsg('Informe seu e-mail para continuar.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  }

  function handleSocialContinue(provider) {
    if (typeof loginSocialDemo === 'function') {
      loginSocialDemo(provider);
      navigate('/');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.cpf.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password.trim() ||
      !form.address.trim() ||
      !form.neighborhood.trim() ||
      !form.city.trim() ||
      !form.cep.trim()
    ) {
      setErrorMsg('Preencha todos os campos obrigatórios (*).');
      return;
    }

    const result = registerUser(form);
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

      {step === 1 ? (
        <main className={styles.gradientArea}>
          <div className={styles.loginContainer}>
            <form className={styles.authCard} onSubmit={handleInitialEmailSubmit}>
              <div className={styles.cardTitleGroup}>
                <h1 className={styles.title}>Crie sua conta</h1>
                <p className={styles.subtitle}>
                  Já possui uma conta? Entre{' '}
                  <Link to="/login" className={styles.inlineLink}>
                    aqui
                  </Link>
                  .
                </p>
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-initial-email">Email *</label>
                <input
                  id="reg-initial-email"
                  type="email"
                  placeholder="Insira seu email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>

              {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

              <button type="submit" className={styles.primaryButton}>
                Criar Conta
              </button>

              <div className={styles.socialRow}>
                <span>Ou faça login com</span>
                <div className={styles.socialIcons}>
                  <button
                    type="button"
                    className={styles.socialButton}
                    onClick={() => handleSocialContinue('Google')}
                    aria-label="Criar conta com Gmail"
                    title="Continuar com Gmail"
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
                    onClick={() => handleSocialContinue('Facebook')}
                    aria-label="Criar conta com Facebook"
                    title="Continuar com Facebook"
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
                src="/figma/auth-sneaker-1.png"
                alt=""
                className={styles.shoeTop}
              />
              <img
                src="/figma/auth-sneaker-2.png"
                alt=""
                className={styles.shoeBottom}
              />
            </div>
          </div>
        </main>
      ) : (
        <main className={styles.registerMain}>
          <form className={styles.registerContainer} onSubmit={handleSubmit}>
            <div className={styles.registerHeader}>
              <h1 className={styles.title}>Criar Conta</h1>
              <p className={styles.subtitle}>
                Já possui uma conta? Entre{' '}
                <Link to="/login" className={styles.inlineLink}>
                  aqui
                </Link>
                .
              </p>
            </div>

            <section className={styles.formCard}>
              <h2 className={styles.cardSectionTitle}>Informações Pessoais</h2>
              <hr className={styles.divider} />

              <div className={styles.field}>
                <label htmlFor="reg-name">Nome Completo *</label>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Insira seu nome"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-cpf">CPF *</label>
                <input
                  id="reg-cpf"
                  type="text"
                  placeholder="Insira seu CPF"
                  value={form.cpf}
                  onChange={(e) => handleChange('cpf', e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-email">E-mail *</label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="Insira seu email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-phone">Celular *</label>
                <input
                  id="reg-phone"
                  type="text"
                  placeholder="Insira seu celular"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-pass">Senha *</label>
                <input
                  id="reg-pass"
                  type="password"
                  placeholder="Crie uma senha"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </div>
            </section>

            <section className={styles.formCard}>
              <h2 className={styles.cardSectionTitle}>Informações de Entrega</h2>
              <hr className={styles.divider} />

              <div className={styles.field}>
                <label htmlFor="reg-address">Endereço *</label>
                <input
                  id="reg-address"
                  type="text"
                  placeholder="Insira seu endereço"
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-neighborhood">Bairro *</label>
                <input
                  id="reg-neighborhood"
                  type="text"
                  placeholder="Insira seu bairro"
                  value={form.neighborhood}
                  onChange={(e) => handleChange('neighborhood', e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-city">Cidade *</label>
                <input
                  id="reg-city"
                  type="text"
                  placeholder="Insira sua cidade"
                  value={form.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-cep">CEP *</label>
                <input
                  id="reg-cep"
                  type="text"
                  placeholder="Insira seu CEP"
                  value={form.cep}
                  onChange={(e) => handleChange('cep', e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reg-comp">Complemento</label>
                <input
                  id="reg-comp"
                  type="text"
                  placeholder="Insira complemento"
                  value={form.complement}
                  onChange={(e) => handleChange('complement', e.target.value)}
                />
              </div>
            </section>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.newsletter}
                onChange={(e) => handleChange('newsletter', e.target.checked)}
              />
              <span>
                Quero receber por email ofertas e novidades das lojas da Digital
                Store. A frequência de envios pode variar de acordo com a
                interação do cliente.
              </span>
            </label>

            {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

            <button type="submit" className={styles.primaryButton}>
              Criar Conta
            </button>
          </form>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default RegisterPage;
