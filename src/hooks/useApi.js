import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function fetchArray(path) {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchArray('/api/products')
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);
  
  return { products, loading };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetchArray('/api/categories')
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);
  
  return categories;
}

export function useCoupons() {
  const [coupons, setCoupons] = useState([]);
  
  useEffect(() => {
    fetchArray('/api/coupons')
      .then(data => setCoupons(data))
      .catch(err => console.error('Failed to fetch coupons:', err));
  }, []);
  
  return coupons;
}
