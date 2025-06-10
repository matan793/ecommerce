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
                style={{ objectFit: 'contain' }}
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
                <div style={{ ...styles.actions, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleAddToCart}
                        sx={{
                            ...styles.button,
                            background: 'linear-gradient(90deg, #57B9FF 0%, #3A8DFF 100%)',
                            boxShadow: '0 2px 8px rgba(87,185,255,0.15)',
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                        startIcon={<FontAwesomeIcon icon={faCartShopping} color="#fff" />}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={handlePurchaseNow}
                        sx={{
                            ...styles.button,
                            borderColor: '#57B9FF',
                            color: '#3A8DFF',
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            '&:hover': {
                                borderColor: '#3A8DFF',
                                background: 'rgba(58,141,255,0.08)',
                            },
                        }}
                    >
                        Purchase Now
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ParfumeCard;