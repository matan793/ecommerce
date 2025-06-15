import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import React from 'react';
import { useBuyMode } from '../../contexts/buyModeContext';
import { useSelectedProduct } from '../../contexts/selectedProdyctContext';
import { api } from '../../api/api';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/userContext';
import { ProductType } from '../../utils/types/types';
import { useModalOpen } from '../../contexts/modalOpenContext';

interface ParfumeCardProps {
    product: ProductType
}

const ParfumeCard: React.FC<ParfumeCardProps> = ({product }) => {
    const {mode, setMode} = useBuyMode();
    const {selectedProduct, setSelectedProduct} = useSelectedProduct();
    const {open, setOpen} = useModalOpen();
    const {fetchUser} = useUser();
    const handleAddToCart = async () => {
        try {
          await  api.addToCart(product.productId, 1);
          toast.success('product added to cart')
          await fetchUser();
        } catch (error) {
            toast.error('somthing wen\'t wrong in adding to cart...')
            console.log(error);
            
        }
        
    };

    const handlePurchaseNow = () => {
        setSelectedProduct(product)
        setMode('single');
        setOpen(true);
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
                image={product.imageUrl}
                alt={product.name}
                sx={{ borderRadius: 1 }}
            />
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand.name}
                </Typography>
                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 'bold', mt: 1 }}>
                    ${product.price.toFixed(2)}
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