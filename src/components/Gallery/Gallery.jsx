import { useEffect, useState } from 'react';
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
          {images.map((item, index) => (
            <div key={item.src + index} className={styles.slide}>
              <img
                src={item.src}
                alt={`Imagem ${index + 1}`}
                className={styles.slideImage}
                style={{ borderRadius: radius }}
              />
            </div>
          ))}
        </div>

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
      </div>

      {showThumbs && (
        <div className={styles.thumbsRow}>
          {images.map((item, index) => {
            const isSelected = index === currentIndex;
            return (
              <button
                key={item.src + index}
                type="button"
                className={`${styles.thumbButton} ${
                  isSelected ? styles.thumbSelected : ''
                }`}
                style={{ borderRadius: radius }}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ver imagem ${index + 1}`}
              >
                <img
                  src={item.src}
                  alt={`Miniatura ${index + 1}`}
                  className={styles.thumbImage}
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
