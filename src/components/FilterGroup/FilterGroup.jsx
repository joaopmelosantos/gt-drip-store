import { useEffect, useRef, useState } from 'react';
import styles from './FilterGroup.module.css';

function normalizeSearch(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Grupo de filtros reutilizável (aceita "checkbox", "radio" ou "select" com busca)
function FilterGroup({
  title,
  inputType = 'checkbox',
  options = [],
  name,
  selectedValues,
  onChange,
  placeholder = 'Digite ou selecione...',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (inputType !== 'select') return undefined;

    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [inputType]);

  function isChecked(optionValue) {
    if (inputType === 'radio') {
      return selectedValues === optionValue;
    }
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(optionValue);
    }
    return false;
  }

  if (inputType === 'select') {
    const selectedList = Array.isArray(selectedValues) ? selectedValues : [];
    const normalizedQuery = normalizeSearch(query);
    const filteredOptions = options.filter((option) =>
      normalizeSearch(option.text).includes(normalizedQuery)
    );

    function handleKeyDown(event) {
      if (event.key === 'Enter' && filteredOptions.length > 0 && onChange) {
        event.preventDefault();
        const firstOption = filteredOptions[0];
        const firstValue =
          firstOption.value !== undefined ? firstOption.value : firstOption.text;
        onChange(firstValue);
        setQuery('');
      }
    }

    return (
      <div className={styles.group} ref={containerRef}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.selectBox}>
          <div
            className={`${styles.selectField} ${isOpen ? styles.selectFieldOpen : ''}`}
          >
            <input
              type="text"
              className={styles.selectInput}
              placeholder={
                selectedList.length > 0
                  ? `${selectedList.length} selecionada(s) · buscar...`
                  : placeholder
              }
              value={query}
              onFocus={() => setIsOpen(true)}
              onClick={() => setIsOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsOpen(true);
              }}
              onKeyDown={handleKeyDown}
              aria-label={`Filtrar por ${title}`}
              aria-expanded={isOpen}
            />

            {query && (
              <button
                type="button"
                className={styles.clearQueryButton}
                onClick={() => setQuery('')}
                aria-label="Limpar busca de marca"
              >
                ✕
              </button>
            )}

            <button
              type="button"
              className={`${styles.chevronButton} ${isOpen ? styles.chevronOpen : ''}`}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={`Abrir opções de ${title}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              className={styles.dropdownMenu}
              role="listbox"
              aria-multiselectable="true"
            >
              {filteredOptions.length === 0 ? (
                <p className={styles.emptyOption}>
                  Nenhuma marca encontrada para &quot;{query}&quot;
                </p>
              ) : (
                filteredOptions.map((option, index) => {
                  const optionValue =
                    option.value !== undefined ? option.value : option.text;
                  const active = isChecked(optionValue);

                  return (
                    <button
                      key={`${title}-${optionValue}-${index}`}
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={`${styles.dropdownOption} ${
                        active ? styles.dropdownOptionActive : ''
                      }`}
                      onClick={() => onChange && onChange(optionValue)}
                    >
                      <span className={styles.optionCheck}>
                        {active ? '✓' : ''}
                      </span>
                      <span className={styles.optionText}>{option.text}</span>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {selectedList.length > 0 && (
          <div className={styles.chipsRow}>
            {selectedList.map((brand) => (
              <button
                key={brand}
                type="button"
                className={styles.brandChip}
                onClick={() => onChange && onChange(brand)}
                title={`Remover ${brand}`}
              >
                <span>{brand}</span>
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.group}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.optionsList}>
        {options.map((option, index) => {
          const optionValue =
            option.value !== undefined ? option.value : option.text;
          const inputId = `${title}-${optionValue}-${index}`;

          return (
            <label key={inputId} htmlFor={inputId} className={styles.optionItem}>
              <input
                id={inputId}
                type={inputType}
                name={inputType === 'radio' ? name || title : undefined}
                value={optionValue}
                className={styles.input}
                checked={
                  selectedValues !== undefined ? isChecked(optionValue) : undefined
                }
                onChange={onChange ? () => onChange(optionValue) : undefined}
              />
              <span className={styles.labelText}>{option.text}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default FilterGroup;
