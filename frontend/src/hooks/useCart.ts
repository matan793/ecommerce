import { useState, useEffect } from 'react';
import { api } from '../api/api';

import { CartItemType } from '../utils/types/types';

export const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const items = await api.getCartItems();
            setCartItems(items);
            setError(null);
        } catch (err) {
            setError('Failed to fetch cart items');
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (id: number, newQuantity: number) => {
        if (newQuantity < 0) return;
        
        try {
            // Optimistic update
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId === id ? { ...item, quantity: newQuantity } : item
                )
            );



            // You would typically make an API call here to update the server
            // await api.updateCartItem(id, newQuantity);
        } catch (err) {
            setError('Failed to update item quantity');
            // Rollback on error
            await fetchCartItems();
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return {
        cartItems,
        loading,
        error,
        updateQuantity,
        refetchCart: fetchCartItems
    };
};