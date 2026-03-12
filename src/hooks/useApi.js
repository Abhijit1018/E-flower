import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
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
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);
  
  return categories;
}

export function useCoupons() {
  const [coupons, setCoupons] = useState([]);
  
  useEffect(() => {
    fetch(`${API_URL}/api/coupons`)
      .then(res => res.json())
      .then(data => setCoupons(data))
      .catch(err => console.error('Failed to fetch coupons:', err));
  }, []);
  
  return coupons;
}
