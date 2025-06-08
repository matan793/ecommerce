import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Product {
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>('http://localhost:3000/products');
        setProducts(res.data);
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