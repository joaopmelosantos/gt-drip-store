import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../Layout';
import ProductListing from '../../components/ProductListing/ProductListing';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import { getAllProducts, normalizeText } from '../../services/productService';
import styles from './ProductListingPage.module.css';

const SORT_OPTIONS = [
  { value: '', label: 'Mais relevantes' },
  { value: 'lowest', label: 'Menor preço' },
  { value: 'highest', label: 'Maior preço' },
  { value: 'rating', label: 'Melhor avaliação' },
];

function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const sortRef = useRef(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      const list = await getAllProducts();
      if (active) {
        setAllProducts(list);
        setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setSortOpen(false);
        setMobileFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Lê o termo ?filter=... enviado pela busca do Header ou links de categoria
  const rawFilter = searchParams.get('filter') || '';
  const searchFilter = normalizeText(rawFilter);

  function toggleSelection(value, currentList, setList) {
    if (currentList.includes(value)) {
      setList(currentList.filter((item) => item !== value));
    } else {
      setList([...currentList, value]);
    }
  }

  function handleClearFilters() {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedCondition('');
    if (rawFilter) {
      setSearchParams({});
    }
  }

  let filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      !searchFilter ||
      normalizeText(product.name).includes(searchFilter) ||
      normalizeText(product.category).includes(searchFilter) ||
      normalizeText(product.brand).includes(searchFilter) ||
      normalizeText(product.reference).includes(searchFilter);

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesGender =
      selectedGenders.length === 0 ||
      selectedGenders.includes(product.gender);

    const matchesCondition =
      !selectedCondition || product.condition === selectedCondition;

    return (
      matchesSearch &&
      matchesBrand &&
      matchesCategory &&
      matchesGender &&
      matchesCondition
    );
  });

  if (sortOrder === 'lowest') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => (a.priceDiscount || a.price) - (b.priceDiscount || b.price)
    );
  } else if (sortOrder === 'highest') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => (b.priceDiscount || b.price) - (a.priceDiscount || a.price)
    );
  } else if (sortOrder === 'rating') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => (b.stars || 0) - (a.stars || 0)
    );
  }

  // Gera lista de marcas únicas presentes nos produtos carregados
  const uniqueBrands = Array.from(
    new Set(allProducts.map((item) => item.brand).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const brandOptions = uniqueBrands.map((brand) => ({
    text: brand,
    value: brand,
  }));

  const categoryOptions = [
    { text: 'Tênis', value: 'Tênis' },
    { text: 'Camisetas', value: 'Camisetas' },
    { text: 'Calças', value: 'Calças' },
    { text: 'Bonés', value: 'Bonés' },
    { text: 'Headphones', value: 'Headphones' },
  ];

  const genderOptions = [
    { text: 'Masculino', value: 'Masculino' },
    { text: 'Feminino', value: 'Feminino' },
    { text: 'Unissex', value: 'Unissex' },
  ];

  const conditionOptions = [
    { text: 'Todos', value: '' },
    { text: 'Novo', value: 'Novo' },
    { text: 'Usado', value: 'Usado' },
  ];

  const hasActiveFilters =
    Boolean(rawFilter) ||
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedGenders.length > 0 ||
    selectedCondition !== '';

  const currentSortLabel =
    SORT_OPTIONS.find((item) => item.value === sortOrder)?.label ||
    'Mais relevantes';

  return (
    <Layout>
      <div className={styles.pageContainer}>
        {/* Linha superior: título à esquerda e Ordenar por customizado à direita */}
        <div className={styles.topBar}>
          <h1 className={styles.resultsTitle}>
            <strong>
              Resultados{rawFilter ? ` para "${rawFilter}"` : ''}
            </strong>{' '}
            <span>
              - {loading ? 'carregando...' : `${filteredProducts.length} produto(s)`}
            </span>
          </h1>

          <div className={styles.controlsRow}>
            <div className={styles.sortWrapper} ref={sortRef}>
              <button
                type="button"
                className={`${styles.sortTrigger} ${sortOpen ? styles.sortTriggerOpen : ''}`}
                onClick={() => setSortOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
              >
                <span className={styles.sortTextGroup}>
                  <span className={styles.sortInlineLabel}>Ordenar por:</span>
                  <span className={styles.sortCurrentValue}>
                    {currentSortLabel}
                  </span>
                </span>
                <svg
                  className={`${styles.selectChevron} ${sortOpen ? styles.chevronOpen : ''}`}
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

              {sortOpen && (
                <div className={styles.sortMenu} role="listbox">
                  {SORT_OPTIONS.map((option) => {
                    const active = option.value === sortOrder;
                    return (
                      <button
                        key={option.value || 'default'}
                        type="button"
                        role="option"
                        aria-selected={active}
                        className={`${styles.sortOption} ${active ? styles.sortOptionActive : ''}`}
                        onClick={() => {
                          setSortOrder(option.value);
                          setSortOpen(false);
                        }}
                      >
                        <span>{option.label}</span>
                        {active && (
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              className={styles.mobileFilterButton}
              onClick={() => setMobileFilterOpen(true)}
              aria-label="Abrir filtros"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {mobileFilterOpen && (
            <div
              className={styles.filterBackdrop}
              onClick={() => setMobileFilterOpen(false)}
              aria-hidden="true"
            />
          )}

          <aside
            className={`${styles.sidebar} ${
              mobileFilterOpen ? styles.sidebarOpen : ''
            }`}
          >
            <div className={styles.filterBox}>
                <div className={styles.filterHeader}>
                  <h2 className={styles.filterTitle}>Filtrar por</h2>
                  <div className={styles.filterHeaderActions}>
                    {hasActiveFilters && (
                      <button
                        type="button"
                        className={styles.clearButton}
                        onClick={handleClearFilters}
                      >
                        Limpar
                      </button>
                    )}
                    <button
                      type="button"
                      className={styles.closeFilterButton}
                      onClick={() => setMobileFilterOpen(false)}
                      aria-label="Fechar filtros"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <hr className={styles.filterDivider} />

                <div className={styles.filterGroups}>
                  <FilterGroup
                    title="Categoria"
                    inputType="checkbox"
                    options={categoryOptions}
                    selectedValues={selectedCategories}
                    onChange={(val) =>
                      toggleSelection(
                        val,
                        selectedCategories,
                        setSelectedCategories
                      )
                    }
                  />

                  {brandOptions.length > 0 && (
                    <FilterGroup
                      title="Marca"
                      inputType="select"
                      placeholder="Digite ou selecione..."
                      options={brandOptions}
                      selectedValues={selectedBrands}
                      onChange={(val) =>
                        toggleSelection(val, selectedBrands, setSelectedBrands)
                      }
                    />
                  )}

                  <FilterGroup
                    title="Gênero"
                    inputType="checkbox"
                    options={genderOptions}
                    selectedValues={selectedGenders}
                    onChange={(val) =>
                      toggleSelection(val, selectedGenders, setSelectedGenders)
                    }
                  />

                  <FilterGroup
                    title="Estado"
                    inputType="radio"
                    name="condition"
                    options={conditionOptions}
                    selectedValues={selectedCondition}
                    onChange={(val) => setSelectedCondition(val)}
                  />
                </div>
              </div>
          </aside>

          <div className={styles.listArea}>
            {loading ? (
              <p className={styles.loadingText}>Carregando produtos...</p>
            ) : (
              <ProductListing products={filteredProducts} columns={3} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductListingPage;
