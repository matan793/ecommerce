import { useEffect, useState } from "react";
import { apiClient } from "../api/api";

export interface CategoryType {
  id: string;
  name: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {   
      try {
        const response = await apiClient.get("/categories");
        setCategories(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};