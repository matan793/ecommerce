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
    },
    deleteProduct: async (productId: number) => {
        try {
            const response = await apiClient.delete(`products/${productId}`)
        } catch (error) {
            throw error;
        }
    },
    editProduct: async (productId: number, product: any) => {
        try {
            const response = await apiClient.patch(`products/${productId}`, { ...product })
        } catch (error) {
            throw error;
        }
    },
    getRevenue: async (): Promise<number> => {
        try {
            const response = (await apiClient.get('/orders/revenue')).data;
            return response;
        } catch (error) {
            throw error;
        }
    },
    countOrdersInMonth: async (year: number, month: number): Promise<number> => {
        try {
            const response = (await apiClient.get(`/orders/${year}/${month}/count`)).data;
            return response;
        } catch (error) {
            throw error;
        }
    },
    revenueInMonth: async (year: number, month: number): Promise<number> => {
        try {
            const response = (await apiClient.get(`/orders/${year}/${month}/sales`)).data;
            return response;
        } catch (error) {
            throw error;
        }
    },
        getMonthlyOrderStats: async (year: number): Promise<{ month: string; orderCount: number }[]> => {
        try {
            const response = await apiClient.get(`/orders/stats/monthly`, {
                params: { year },
            });
            return response.data;
        } catch (error) {
            toast.error('Failed to fetch monthly order stats');
            throw error;
        }
    },

};