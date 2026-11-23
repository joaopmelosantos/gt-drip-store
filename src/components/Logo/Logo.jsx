import logoHeader from '../../assets/logo-header.svg';
import logoFooter from '../../assets/logo-footer.svg';
import styles from './Logo.module.css';

// Componente reutilizável da logomarca (versão padrão para Header e branca para Footer)
function Logo({ variant = 'header' }) {
  const src = variant === 'footer' ? logoFooter : logoHeader;

  return (
    <img
      src={src}
      alt="Digital Store"
      className={styles.logo}
      width={253}
      height={44}
    />
  );
}

export default Logo;
