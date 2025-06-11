import axios from "axios";
import { BrandType, ProductType } from "../utils/types/types";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout
    withCredentials: true, // Include cookies in requests
});

export const api = {
    getProducts: async () => {
        try {
            const response = await apiClient.get<ProductType[]>("/products");
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

    getBrands: async () => {
        try {
            const response = await apiClient.get<BrandType[]>("/brands");
            return response.data;
        } catch (error) {
            console.error("Error fetching brands:", error);
            throw error;
        }
    },
    getCategories: async () => {
        try {
            const response = await apiClient.get("/categories");
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }
};