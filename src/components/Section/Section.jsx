import { Link } from 'react-router-dom';
import styles from './Section.module.css';

// Componente padrão de seção: exibe título (alinhado à esquerda ou centralizado), link opcional e filhos
function Section({ title, titleAlign = 'left', link, children }) {
  const isCentered = titleAlign === 'center';

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2
          className={`${styles.title} ${isCentered ? styles.titleCenter : ''}`}
        >
          {title}
        </h2>

        {link && (
          <Link to={link.href} className={styles.link}>
            {link.text} →
          </Link>
        )}
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default Section;
