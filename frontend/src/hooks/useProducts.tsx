import { api } from '../api/api';
import { ProductType } from '../utils/types/types';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ProductsContextType = {
  products: ProductType[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};