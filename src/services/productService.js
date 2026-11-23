import { products as baseProducts } from '../data/products.js';

// Cache simples em memória para evitar refazer todas as chamadas ao navegar entre páginas
let cachedProducts = null;

// Remove acentos e deixa minúsculo para buscas e filtros funcionarem com "tenis", "calcas", "bones", etc.
export function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function buildPastelGallery(imagesList, fallbackImage) {
  const pastelColors = ['#E2E3FF', '#FFE8BC', '#FFC0BC', '#DEC699', '#E8DFCF'];
  const list =
    Array.isArray(imagesList) && imagesList.length > 0
      ? imagesList
      : [fallbackImage];

  return list.slice(0, 5).map((src, index) => ({
    src,
    bg: pastelColors[index % pastelColors.length],
  }));
}

function mapDummyProduct(item, categoryPt, genderPt) {
  const price = Math.round(item.price);
  const discountRate = item.discountPercentage || 0;
  const priceDiscount =
    discountRate >= 3
      ? Math.round(price * (1 - discountRate / 100))
      : undefined;

  return {
    id: `dummy-${item.id}`,
    name: item.title,
    category: categoryPt,
    brand: item.brand || 'Digital Store',
    gender: genderPt,
    condition: 'Novo',
    image: item.thumbnail,
    images: buildPastelGallery(item.images, item.thumbnail),
    price,
    priceDiscount,
    showDiscountBadge: discountRate >= 10,
    reference: `Casual | ${item.brand || 'Digital Store'} | REF:DJ-${item.id}`,
    stars: Number((item.rating || 4.5).toFixed(1)),
    rating: item.stock ? item.stock * 2 : 48,
    description: item.description,
    sizes:
      categoryPt === 'Tênis'
        ? ['38', '39', '40', '41', '42']
        : categoryPt === 'Camisetas'
          ? ['P', 'M', 'G', 'GG']
          : ['Único'],
    colors: ['#1F1F1F', '#C92071', '#474747'],
  };
}

function mapFakeStoreProduct(item) {
  const isWomen = item.category === "women's clothing";
  const price = Math.round(item.price);

  return {
    id: `fakestore-${item.id}`,
    name: item.title,
    category: 'Camisetas',
    brand: 'FakeStore',
    gender: isWomen ? 'Feminino' : 'Masculino',
    condition: 'Novo',
    image: item.image,
    images: buildPastelGallery([item.image], item.image),
    price,
    priceDiscount: Math.round(price * 0.85),
    showDiscountBadge: item.id === 2,
    reference: `Casual | FakeStore | REF:FS-${item.id}`,
    stars: Number((item.rating?.rate || 4.3).toFixed(1)),
    rating: item.rating?.count || 60,
    description: item.description,
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['#1F1F1F', '#FFFFFF', '#C92071'],
  };
}

function mapReactBdJeans(item) {
  const price = Math.round(item.price);
  const oldPrice = item.oldPrice ? Math.round(Number(item.oldPrice)) : price;

  return {
    id: `reactbd-${item._id}`,
    name: item.title,
    category: 'Calças',
    brand: 'ReactBD Wear',
    gender: item.category === 'men' ? 'Masculino' : 'Feminino',
    condition: item.isNew ? 'Novo' : 'Usado',
    image: item.image,
    images: buildPastelGallery([item.image], item.image),
    price: oldPrice > price ? oldPrice : price,
    priceDiscount: oldPrice > price ? price : undefined,
    showDiscountBadge: oldPrice > price,
    reference: `Casual | ReactBD | REF:RB-${item._id}`,
    stars: Number((item.rating || 4.6).toFixed(1)),
    rating: 42,
    description: item.description,
    sizes: ['38', '40', '42', '44'],
    colors: ['#3B4252', '#1F1F1F', '#B5B6F2'],
  };
}

function mapReactBdHeadphone(item) {
  const price = Math.round(item.price);
  const oldPrice = item.oldPrice ? Math.round(Number(item.oldPrice)) : price;

  return {
    id: `reactbd-audio-${item._id}`,
    name: item.title,
    category: 'Headphones',
    brand: item.brand || 'Beats',
    gender: 'Unissex',
    condition: 'Novo',
    image: item.image,
    images: buildPastelGallery([item.image], item.image),
    price: oldPrice > price ? oldPrice : price,
    priceDiscount: oldPrice > price ? price : undefined,
    showDiscountBadge: oldPrice > price,
    reference: `Esporte e lazer | ${item.brand || 'Audio'} | REF:AU-${item._id}`,
    stars: 4.8,
    rating: 74,
    description: item.description,
    sizes: ['Único'],
    colors: ['#1F1F1F', '#C92071'],
  };
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status} em ${url}`);
  }
  return response.json();
}

export async function getAllProducts() {
  if (cachedProducts) {
    return cachedProducts;
  }

  const results = await Promise.allSettled([
    fetchJson('https://dummyjson.com/products/category/mens-shoes'),
    fetchJson('https://dummyjson.com/products/category/womens-shoes'),
    fetchJson('https://dummyjson.com/products/category/mens-shirts'),
    fetchJson('https://dummyjson.com/products/category/mobile-accessories'),
    fetchJson('https://fakestoreapi.com/products'),
    fetchJson('https://fakestoreapiserver.reactbd.com/products'),
    fetchJson('https://fakestoreapiserver.reactbd.com/nextamazon'),
    fetchJson('/api/caps.json'),
  ]);

  const apiProducts = [];

  // 1. DummyJSON - Tênis masculinos e femininos
  if (results[0].status === 'fulfilled') {
    const mensShoes = results[0].value.products || [];
    apiProducts.push(
      ...mensShoes.map((item) => mapDummyProduct(item, 'Tênis', 'Masculino'))
    );
  }
  if (results[1].status === 'fulfilled') {
    const womensShoes = results[1].value.products || [];
    apiProducts.push(
      ...womensShoes.map((item) => mapDummyProduct(item, 'Tênis', 'Feminino'))
    );
  }

  // 2. DummyJSON - Camisetas
  if (results[2].status === 'fulfilled') {
    const mensShirts = results[2].value.products || [];
    apiProducts.push(
      ...mensShirts.map((item) =>
        mapDummyProduct(item, 'Camisetas', 'Masculino')
      )
    );
  }

  // 3. DummyJSON - Headphones (AirPods Max, Beats Flex, Airpods)
  if (results[3].status === 'fulfilled') {
    const accessories = results[3].value.products || [];
    const headphones = accessories.filter((item) =>
      /airpods|beats|earphone|headphone/i.test(item.title)
    );
    apiProducts.push(
      ...headphones.map((item) =>
        mapDummyProduct(item, 'Headphones', 'Unissex')
      )
    );
  }

  // 4. FakeStoreAPI - Camisetas / Vestuário
  if (results[4].status === 'fulfilled') {
    const fakeItems = (results[4].value || []).filter(
      (item) =>
        (item.category === "men's clothing" ||
          item.category === "women's clothing") &&
        !/backpack/i.test(item.title)
    );
    apiProducts.push(...fakeItems.slice(0, 6).map(mapFakeStoreProduct));
  }

  // 5. ReactBD FakeStore - Calças (jeans)
  if (results[5].status === 'fulfilled') {
    const jeans = (results[5].value || []).filter((item) =>
      /jins|jeans/i.test(item.title)
    );
    apiProducts.push(...jeans.map(mapReactBdJeans));
  }

  // 6. ReactBD NextAmazon - Headphones extras (Beats Solo3, Skullcandy)
  if (results[6].status === 'fulfilled') {
    const audio = (results[6].value || []).filter((item) =>
      /beats|headphone|skullcandy/i.test(item.title)
    );
    apiProducts.push(...audio.map(mapReactBdHeadphone));
  }

  // 7. Catálogo local de Bonés (/api/caps.json)
  if (results[7].status === 'fulfilled') {
    const caps = results[7].value || [];
    apiProducts.push(...caps);
  }

  // Mantém os produtos base do Figma no início e adiciona os produtos das APIs
  cachedProducts = [...baseProducts, ...apiProducts];
  return cachedProducts;
}

export async function getProductById(id) {
  const all = await getAllProducts();
  return all.find((item) => String(item.id) === String(id)) || all[0];
}
