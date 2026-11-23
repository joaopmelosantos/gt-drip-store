import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import facebookIcon from '../../assets/facebook.svg';
import instagramIcon from '../../assets/instagram.svg';
import twitterIcon from '../../assets/twitter.svg';
import styles from './Footer.module.css';

// Subcomponente para renderizar colunas de links do rodapé (title + array informations)
function FooterInfo({ title, informations }) {
  return (
    <div className={styles.infoColumn}>
      <h3 className={styles.infoTitle}>{title}</h3>
      <ul className={styles.infoList}>
        {informations.map((item) => (
          <li key={item.text}>
            <Link to={item.link} className={styles.infoLink}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const infoLinks = [
    { text: 'Sobre Drip Store', link: '/about' },
    { text: 'Segurança', link: '/security' },
    { text: 'Wishlist', link: '/wishlist' },
    { text: 'Blog', link: '/blog' },
    { text: 'Trabalhe conosco', link: '/careers' },
    { text: 'Meus Pedidos', link: '/orders' },
  ];

  const categoryLinks = [
    { text: 'Camisetas', link: '/products?filter=camisetas' },
    { text: 'Calças', link: '/products?filter=calcas' },
    { text: 'Bonés', link: '/products?filter=bones' },
    { text: 'Headphones', link: '/products?filter=headphones' },
    { text: 'Tênis', link: '/products?filter=tenis' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.brandColumn}>
            <Logo variant="footer" />
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <img src={twitterIcon} alt="Twitter" />
              </a>
            </div>
          </div>

          <FooterInfo title="Informação" informations={infoLinks} />
          <FooterInfo title="Categorias" informations={categoryLinks} />

          <div className={styles.infoColumn}>
            <h3 className={styles.infoTitle}>Contato</h3>
            <p className={styles.contactText}>
              Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE,
              60150-161
            </p>
            <p className={styles.contactText}>(85) 3051-3411</p>
          </div>
        </div>

        <hr className={styles.divider} />
        <p className={styles.copyright}>© 2026 Digital Store</p>
      </div>
    </footer>
  );
}

export default Footer;
