import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React from 'react';

interface CartItemCardProps {
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ 
    name, 
    brand, 
    price, 
    imageUrl, 
    quantity,
    onIncrement,
    onDecrement 
}) => {
    const styles = {
        card: { 
            width: '100%',
            display: 'flex',
            mb: 2,
            borderRadius: 2 
        },
        media: { 
            width: 120,
            height: 120,
            objectFit: 'contain',
            p: 1
        },
        content: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        quantityControl: {
            display: 'flex',
            alignItems: 'center',
            gap: 1
        }
    };

    return (
        <Card sx={styles.card}>
            <CardMedia
                component="img"
                image={imageUrl}
                alt={name}
                sx={styles.media}
            />
            <CardContent sx={styles.content}>
                <div>
                    <Typography variant="h6" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {brand}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>
                        ${(price * quantity).toFixed(2)}
                    </Typography>
                </div>
                <Box sx={styles.quantityControl}>
                    <IconButton 
                        size="small" 
                        onClick={onDecrement}
                        disabled={quantity <= 1}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{quantity}</Typography>
                    <IconButton 
                        size="small" 
                        onClick={onIncrement}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CartItemCard;