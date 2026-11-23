import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPages.module.css';

function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

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

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.cpf.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password.trim() ||
      !form.address.trim() ||
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
              Store.
            </span>
          </label>

          {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

          <button type="submit" className={styles.primaryButton}>
            Criar Conta
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default RegisterPage;
