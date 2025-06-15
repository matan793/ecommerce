import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    Divider,
    Button,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CartItemCard from '../cartItemCard/CartItemCard';
import { CartItemType } from '../../utils/types/types';

interface CartProps {
    open: boolean;
    onClose: () => void;
    items: CartItemType[]
    onUpdateQuantity: (id: number, newQuantity: number) => void;
    isLoading?: boolean; // Add this line
    onPurchaceNow: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose, items, onUpdateQuantity, onPurchaceNow }) => {
    const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 400 } }
            }}

        >
            <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Shopping Cart</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />

                <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
                    {items.map((item) => (
                        <CartItemCard
                            name={item.product.name} brand={item.product.brand.name} price={item.product.price} imageUrl={item.product.imageUrl} key={item.productId}

                            onIncrement={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                            onDecrement={() => onUpdateQuantity(item.productId, item.quantity - 1)} quantity={item.quantity} />
                    ))}

                </Box>

                <Divider />
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Total: ${totalAmount.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                        <Button
                        onClick={() => {onPurchaceNow()}}
                            fullWidth
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(90deg, #57B9FF 0%, #3A8DFF 100%)',
                                color: 'white',
                                py: 1.5
                            }}
                        >
                            Checkout
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Drawer>
    );
};

export default Cart;