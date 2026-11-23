import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../Layout';
import ProductListing from '../../components/ProductListing/ProductListing';
import FilterGroup from '../../components/FilterGroup/FilterGroup';
import Reveal from '../../components/Reveal/Reveal';
import { products } from '../../data/products';
import styles from './ProductListingPage.module.css';

function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('');

  // Lê o termo ?filter=... enviado pela busca do Header
  const rawFilter = searchParams.get('filter') || '';
  const searchFilter = rawFilter.toLowerCase();

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
  }

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchFilter ||
      product.name.toLowerCase().includes(searchFilter) ||
      product.category.toLowerCase().includes(searchFilter) ||
      product.brand.toLowerCase().includes(searchFilter);

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) =>
        product.reference.toLowerCase().includes(cat.toLowerCase())
      );

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
  }

  const brandOptions = [
    { text: 'Adidas', value: 'Adidas' },
    { text: 'Balenciaga', value: 'Balenciaga' },
    { text: 'K-Swiss', value: 'K-Swiss' },
    { text: 'Nike', value: 'Nike' },
    { text: 'Puma', value: 'Puma' },
  ];

  const categoryOptions = [
    { text: 'Esporte e lazer', value: 'Esporte e lazer' },
    { text: 'Casual', value: 'Casual' },
    { text: 'Utilitário', value: 'Utilitário' },
    { text: 'Corrida', value: 'Corrida' },
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
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedGenders.length > 0 ||
    selectedCondition !== '';

  return (
    <Layout>
      <div className={styles.pageContainer}>
        {/* Linha superior idêntica ao Figma: título à esquerda e Ordenar por à direita */}
        <div className={styles.topBar}>
          <h1 className={styles.resultsTitle}>
            <strong>
              Resultados{rawFilter ? ` para "${rawFilter}"` : ''}
            </strong>{' '}
            <span>- {filteredProducts.length} produto(s)</span>
          </h1>

          <div className={styles.sortWrapper}>
            <label htmlFor="sortSelect" className={styles.sortInlineLabel}>
              Ordenar por:
            </label>
            <select
              id="sortSelect"
              className={styles.sortSelect}
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="">mais relevantes</option>
              <option value="lowest">menor preço</option>
              <option value="highest">maior preço</option>
            </select>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <aside className={styles.sidebar}>
            <Reveal>
              <div className={styles.filterBox}>
                <div className={styles.filterHeader}>
                  <h2 className={styles.filterTitle}>Filtrar por</h2>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      className={styles.clearButton}
                      onClick={handleClearFilters}
                    >
                      Limpar
                    </button>
                  )}
                </div>
                <hr className={styles.filterDivider} />

                <div className={styles.filterGroups}>
                  <FilterGroup
                    title="Marca"
                    inputType="checkbox"
                    options={brandOptions}
                    selectedValues={selectedBrands}
                    onChange={(val) =>
                      toggleSelection(val, selectedBrands, setSelectedBrands)
                    }
                  />

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
            </Reveal>
          </aside>

          <div className={styles.listArea}>
            <ProductListing products={filteredProducts} columns={3} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductListingPage;
