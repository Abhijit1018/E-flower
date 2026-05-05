import { useState, useEffect } from 'react';
import { fetchArray } from '../utils/api';

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
