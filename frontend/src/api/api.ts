import axios from "axios";
import { BrandType, OrderType, ProductType, UserType } from "../utils/types/types";
import { toast } from "react-toastify";

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
            toast.error('somthing went wrong, please refresh')
            throw error;
        }
    },

    getProductById: async (id: string) => {
        try {
            const response = await apiClient.get(`/products/${id}`);
            return response.data;
        } catch (error) {

            throw error;
        }
    },

    getBrands: async () => {
        try {
            const response = await apiClient.get<BrandType[]>("/brands");
            return response.data;
        } catch (error) {

            throw error;
        }
    },
    getCategories: async () => {
        try {
            const response = await apiClient.get("/categories");
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getCartItems: async () => {
        try {
            const response = await apiClient.get("/cart");
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateUser: async (user: UserType) => {
        try {
            const response = await apiClient.post("/users/update", { ...user });
            if (response.status === 404)
                throw new Error("User not found");

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addToCart: async (productId: number, quantity: number) => {
        try {
            const response = await apiClient.post("/cart/add", {
                productId,
                quantity
            });
            return response.data;
        } catch (error) {

            throw error;
        }
    },
    placeOrder: async (order: OrderType) => {
        try {
            const response = await apiClient.post('orders/place', {
                ...order
            })
        } catch (error) {
            throw error;
        }
    },
    deleteCart: async () => {
        try {
            const response = await apiClient.delete('cart/all');
        } catch (error) {
            throw error;
        }
    },
    loginWithGoogle: async (credential: string | undefined) => {
        try {
            const response = await apiClient.post('auth/google', {
                token: credential
            })
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};