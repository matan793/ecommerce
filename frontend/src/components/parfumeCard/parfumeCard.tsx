import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import React from 'react';

interface ParfumeCardProps {
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
}

const ParfumeCard: React.FC<ParfumeCardProps> = ({ name, brand, price, imageUrl }) => {
    const handleAddToCart = () => {
        // Add to cart logic here
        // alert(`Added ${name} to cart!`);
    };

    const handlePurchaseNow = () => {
        // Purchase logic here
        // alert(`Proceeding to purchase ${name}!`);
    };
    const styles = {
        card: { width: 220, borderRadius: 2 },
        media: { borderRadius: 1 },
        price: { fontWeight: 'bold', mt: 1 },
        actions: { display: 'flex', gap: 6, marginTop: 12 },
        button: { minHeight: 22, padding: '0px 6px', fontSize: '0.68rem' },
        // purchaseNowBtn: { minHeight: 22, padding: '0px 6px', fontSize: '0.68rem' }
    };
    return (
        <Card sx={styles.card}>
            <CardMedia
                component="img"
                height="180"
                image={imageUrl}
                alt={name}
                sx={{ borderRadius: 1 }}
            />
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {brand}
                </Typography>
                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 'bold', mt: 1 }}>
                    ${price.toFixed(2)}
                </Typography>
                <div style={styles.actions}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="small"
                        onClick={handleAddToCart}
                        sx={styles.button}
                    >
                        Add to Cart 
                    {/* <FontAwesomeIcon icon={faCartShopping} color='#57B9FF' /> */}
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        size="small"
                        onClick={handlePurchaseNow}
                        sx={styles.button}
                    >
                        Purchase Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ParfumeCard;