import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrowLeft from '../../assets/arrow-left.svg';
import arrowRight from '../../assets/arrow-right.svg';
import styles from './Gallery.module.css';

// Garante unidade px caso o valor seja passado apenas como número (ex.: "1440")
function formatSize(value) {
  if (!value) return undefined;
  const text = String(value).trim();
  return /^\d+$/.test(text) ? `${text}px` : text;
}

function Gallery({
  className = '',
  width,
  height,
  radius = '0px',
  showThumbs = false,
  showDots = false,
  showArrows = true,
  images = [],
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reinicia para a primeira imagem quando a lista de imagens muda (ex.: troca de produto)
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  if (images.length === 0) {
    return null;
  }

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  function handlePrev() {
    if (!isFirst) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function handleNext() {
    if (!isLast) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  const formattedWidth = formatSize(width);
  const formattedHeight = formatSize(height);

  return (
    <div
      className={`${styles.gallery} ${className}`.trim()}
      style={{ maxWidth: formattedWidth }}
    >
      <div
        className={styles.viewport}
        style={{
          height: formattedHeight,
          borderRadius: radius,
        }}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((item, index) => {
            // Modo banner Hero (Figma Home) quando o slide traz título e descrição
            if (item.title) {
              return (
                <div
                  key={`${item.title}-${index}`}
                  className={styles.heroSlide}
                  style={{ backgroundColor: item.bg || 'var(--light-gray-3)' }}
                >
                  <div className={styles.heroInner}>
                    <div className={styles.heroText}>
                      {item.eyebrow && (
                        <span className={styles.heroEyebrow}>
                          {item.eyebrow}
                        </span>
                      )}
                      <h1 className={styles.heroTitle}>{item.title}</h1>
                      {item.description && (
                        <p className={styles.heroDescription}>
                          {item.description}
                        </p>
                      )}
                      {item.buttonText && (
                        <Link
                          to={item.buttonHref || '/products'}
                          className={styles.heroButton}
                        >
                          {item.buttonText}
                        </Link>
                      )}
                    </div>

                    <div className={styles.heroVisual}>
                      {item.ornament && (
                        <img
                          src={item.ornament}
                          alt=""
                          aria-hidden="true"
                          className={styles.heroOrnament}
                        />
                      )}
                      <img
                        src={item.src}
                        alt={item.title}
                        className={styles.heroImage}
                      />
                    </div>
                  </div>
                </div>
              );
            }

            // Modo galeria padrão de produto (fundo pastel + tênis centralizado)
            return (
              <div
                key={`${item.src}-${index}`}
                className={styles.slide}
                style={{
                  backgroundColor: item.bg || 'var(--white)',
                  borderRadius: radius,
                }}
              >
                <img
                  src={item.src}
                  alt={`Imagem ${index + 1}`}
                  className={
                    item.bg ? styles.slideImageContained : styles.slideImage
                  }
                  style={{ borderRadius: radius }}
                />
              </div>
            );
          })}
        </div>

        {showArrows && (
          <>
            <button
              type="button"
              className={`${styles.arrowButton} ${styles.arrowLeft}`}
              onClick={handlePrev}
              disabled={isFirst}
              aria-label="Imagem anterior"
            >
              <img src={arrowLeft} alt="Anterior" />
            </button>

            <button
              type="button"
              className={`${styles.arrowButton} ${styles.arrowRight}`}
              onClick={handleNext}
              disabled={isLast}
              aria-label="Próxima imagem"
            >
              <img src={arrowRight} alt="Próxima" />
            </button>
          </>
        )}

        {showDots && images.length > 1 && (
          <div className={styles.dotsRow}>
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.dot} ${
                  index === currentIndex ? styles.dotActive : ''
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para o slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {showThumbs && (
        <div className={styles.thumbsRow}>
          {images.map((item, index) => {
            const isSelected = index === currentIndex;
            return (
              <button
                key={`${item.src}-${index}`}
                type="button"
                className={`${styles.thumbButton} ${
                  isSelected ? styles.thumbSelected : ''
                }`}
                style={{
                  borderRadius: radius,
                  backgroundColor: item.bg || 'var(--white)',
                }}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ver imagem ${index + 1}`}
              >
                <img
                  src={item.src}
                  alt={`Miniatura ${index + 1}`}
                  className={
                    item.bg ? styles.thumbImageContained : styles.thumbImage
                  }
                  style={{ borderRadius: radius }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Gallery;
