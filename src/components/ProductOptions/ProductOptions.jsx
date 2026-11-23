import { useEffect, useState } from 'react';
import styles from './ProductOptions.module.css';

// Exibe variações do produto (tamanhos em texto ou cores em círculo/quadrado)
function ProductOptions({
  title,
  options = [],
  radius = '4px',
  shape = 'square',
  type = 'text',
  onSelect,
}) {
  // No Figma, o tamanho selecionado inicial costuma destacar uma opção do meio ou a primeira
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reinicia seleção ao trocar de produto/opções
  useEffect(() => {
    setSelectedIndex(0);
  }, [options]);

  function handleOptionClick(index, option) {
    setSelectedIndex(index);
    if (onSelect) {
      onSelect(option);
    }
  }

  return (
    <div className={styles.wrapper}>
      {title && <span className={styles.title}>{title}</span>}

      <div className={styles.optionsRow}>
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          const isCircle = shape === 'circle';
          const isColor = type === 'color';

          const shapeClass = isCircle ? styles.circle : styles.square;
          const selectedClass = isSelected ? styles.selected : '';
          const typeClass = isColor ? styles.colorOption : styles.textOption;

          return (
            <button
              key={`${option}-${index}`}
              type="button"
              onClick={() => handleOptionClick(index, option)}
              className={`${styles.optionButton} ${shapeClass} ${typeClass} ${selectedClass}`}
              style={{
                borderRadius: isCircle ? '50%' : radius,
                backgroundColor: isColor ? option : undefined,
              }}
              aria-label={isColor ? `Cor ${option}` : `Opção ${option}`}
              aria-pressed={isSelected}
            >
              {!isColor && option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductOptions;
