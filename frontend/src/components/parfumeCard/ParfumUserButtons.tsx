import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { api } from '../../api/api';
import { useBuyMode } from '../../contexts/buyModeContext';
import { useModalOpen } from '../../contexts/modalOpenContext';
import { useSelectedProduct } from '../../contexts/selectedProdyctContext';
import { useUser } from '../../contexts/userContext';
import { ProductType } from '../../utils/types/types';

const styles = {
    button: { minHeight: 22, padding: '0px 6px', fontSize: '0.68rem' },
    actions: { display: 'flex', gap: 6, marginTop: 12 },
}
interface ParfumUserButtonsProps{
    product: ProductType;
}
const ParfumUserButtons: React.FC<ParfumUserButtonsProps> = ({ product }: ParfumUserButtonsProps) => {
    const { mode, setMode } = useBuyMode();
    const { selectedProduct, setSelectedProduct } = useSelectedProduct();
    const { open, setOpen } = useModalOpen();
    const { fetchUser } = useUser();
    const handleAddToCart = async () => {
        try {
            await api.addToCart(product.productId, 1);
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
    return (
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
    );
};

export default ParfumUserButtons;