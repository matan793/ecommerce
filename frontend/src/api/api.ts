import axios from "axios";
import { Product } from "../hooks/useProducts";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout
});

export const api = {
    getProducts: async () => {
        try {
            const response = await apiClient.get<Product[]>("/products");
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },

    getProductById: async (id: string) => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            throw error;
        }
    },
};