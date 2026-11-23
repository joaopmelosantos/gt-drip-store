import styles from './FilterGroup.module.css';

// Grupo de filtros reutilizável (aceita inputType "checkbox" ou "radio")
function FilterGroup({
  title,
  inputType = 'checkbox',
  options = [],
  name,
  selectedValues,
  onChange,
}) {
  function isChecked(optionValue) {
    if (inputType === 'radio') {
      return selectedValues === optionValue;
    }
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(optionValue);
    }
    return false;
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
