import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../api/api';
import { ProductType } from '../utils/types/types';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await api.getProducts();
        setProducts(res);
        setError(null);
      } catch (err) {
        setProducts([]);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};