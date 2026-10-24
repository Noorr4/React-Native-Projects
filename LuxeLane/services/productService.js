
const BASE_URL = 'https://dummyjson.com/products';

// Categories that match LuxeLane's shopping sections.
const API_CATEGORIES = [
  {
    apiCategory: 'beauty',
    category: 'Makeup',
    subcategory: 'Makeup',
    gender: 'Female',
  },
  {
    apiCategory: 'mens-shirts',
    category: 'Clothes',
    subcategory: 'Stitched',
    gender: 'Male',
  },
  {
    apiCategory: 'womens-dresses',
    category: 'Clothes',
    subcategory: 'Stitched',
    gender: 'Female',
  },
  {
    apiCategory: 'mens-watches',
    category: 'Accessories',
    subcategory: 'Watches',
    gender: 'Male',
  },
  {
    apiCategory: 'womens-watches',
    category: 'Accessories',
    subcategory: 'Watches',
    gender: 'Female',
  },
  {
    apiCategory: 'womens-jewellery',
    category: 'Accessories',
    subcategory: 'Jewellery',
    gender: 'Female',
  },
  {
    apiCategory: 'womens-bags',
    category: 'Accessories',
    subcategory: 'Purses',
    gender: 'Female',
  },
];

async function fetchCategory(item) {
  const response = await fetch(
    `${BASE_URL}/category/${item.apiCategory}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load ${item.apiCategory}`);
  }

  const data = await response.json();

  return data.products.map((product) => ({
    ...product,
    id: `api-${product.id}`,
    category: item.category,
    subcategory: item.subcategory,
    gender: item.gender,
    source: 'api',
    priceCurrency: 'USD',
  }));
}

export async function getProducts() {
  const results = await Promise.allSettled(
    API_CATEGORIES.map(fetchCategory)
  );

  const products = results
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value);

  // Only report a total failure if every API category failed.
  if (products.length === 0) {
    throw new Error('Unable to load products from the API.');
  }

  return products;
}
