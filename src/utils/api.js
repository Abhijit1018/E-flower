import { products, categories, coupons } from '../data/data';

const LOCAL_API_BASE = 'http://localhost:3001';

function normalizeBase(url) {
  return (url || '').replace(/\/$/, '');
}

function getApiBases() {
  const configured = normalizeBase(import.meta.env.VITE_API_URL);
  const bases = [configured, LOCAL_API_BASE].filter(Boolean);
  return [...new Set(bases)];
}

export async function fetchJson(path, options) {
  // Mock backend with local data
  if (path.startsWith('/api/products/')) {
    const id = path.split('/').pop();
    const product = products.find(p => p.id === parseInt(id));
    if (product) return product;
    throw new Error('Not found');
  }

  if (path.startsWith('/api/products')) {
    const url = new URL('http://localhost' + path);
    const category = url.searchParams.get('category');
    if (category && category !== 'all') {
      return products.filter(p => p.category === category);
    }
    return products;
  }

  if (path === '/api/categories') {
    return categories;
  }

  if (path === '/api/coupons') {
    return coupons;
  }

  const bases = getApiBases();
  let lastError;

  for (const base of bases) {
    try {
      const response = await fetch(`${base}${path}`, options);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Failed to fetch API data');
}

export async function fetchArray(path, options) {
  const data = await fetchJson(path, options);
  return Array.isArray(data) ? data : [];
}
