import * as React from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl as MuiFormControl } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { OrderItemType, OrderStatus, OrderType, PaymentMethod, PaymentStatus, ProductType } from '../../utils/types/types';
import { useUser } from '../../contexts/userContext';

interface OrderModalProps {
    open: boolean;
    onClose: () => void;
    onBuy: (order: OrderType) => void;
    mode: 'single' | 'cart';
    product: ProductType | null;
}

const OrderModal =  ({ open, onClose, onBuy, mode, product }: OrderModalProps) => {
    const { user } = useUser();
    const [paymentMethod, setPaymentMethod] = React.useState<'creditCard' | 'paypal'>('creditCard');
    const [creditCard, setCreditCard] = React.useState({
        number: '',
        expiry: '',
        cvc: '',
    });
    const [paypalEmail, setPaypalEmail] = React.useState('');

    const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreditCard({ ...creditCard, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user || (mode === 'single' && !product)) {
            return;
        }

        try {
            let items: OrderItemType[] = [];
            let totalAmount = 0;

            if (mode === 'single' && product) {
                items = [{
                    product,
                    quantity: 1,
                    unitPrice: product.price
                }];
                totalAmount = product.price;
            } else if (mode === 'cart' && user.cart) {
                items = user.cart.map(cartItem => ({
                    product: cartItem.product,
                    quantity: cartItem.quantity,
                    unitPrice: cartItem.product.price
                }));
                totalAmount = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
            }

            if (items.length === 0) {
                return;
            }

            const order: OrderType = {
                status: OrderStatus.pending,
                totalAmount,
                user,
                address: user.address,
                items,
                payments: [{
                    paymentMethod: paymentMethod === 'creditCard' ? PaymentMethod.creditCard : PaymentMethod.paypal,
                    paymentStatus: PaymentStatus.pending,
                    amount: totalAmount
                }]
            };

            onBuy(order);
            onClose();
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (

        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogContent>Fill in the order details below.</DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <MuiFormControl fullWidth>
                            <InputLabel id="payment-method-label">Payment Method</InputLabel>
                            <Select
                                labelId="payment-method-label"
                                id="payment-method"
                                value={paymentMethod}
                                label="Payment Method"
                                onChange={e => setPaymentMethod(e.target.value as 'creditCard' | 'paypal')}
                                sx={{ background: '#f5faff', borderRadius: 2 }}
                            >
                                <MenuItem value="creditCard">Credit Card</MenuItem>
                                <MenuItem value="paypal">PayPal</MenuItem>
                            </Select>
                        </MuiFormControl>
                        {paymentMethod === 'creditCard' && (
                            <>
                                <FormControl>
                                    <FormLabel>Credit Card Number</FormLabel>
                                    <Input
                                        required
                                        name="number"
                                        value={creditCard.number}
                                        onChange={handleCreditCardChange}
                                        placeholder="1234 5678 9012 3456"
                                    />
                                </FormControl>
                                <Stack direction="row" spacing={2}>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel>Expiry</FormLabel>
                                        <Input
                                            required
                                            name="expiry"
                                            value={creditCard.expiry}
                                            onChange={handleCreditCardChange}
                                            placeholder="MM/YY"
                                        />
                                    </FormControl>
                                    <FormControl sx={{ flex: 1 }}>
                                        <FormLabel>CVC</FormLabel>
                                        <Input
                                            required
                                            name="cvc"
                                            value={creditCard.cvc}
                                            onChange={handleCreditCardChange}
                                            placeholder="123"
                                        />
                                    </FormControl>
                                </Stack>
                            </>
                        )}
                        {paymentMethod === 'paypal' && (
                            <FormControl>
                                <FormLabel>PayPal Email</FormLabel>
                                <Input
                                    required
                                    name="paypalEmail"
                                    type="email"
                                    value={paypalEmail}
                                    onChange={e => setPaypalEmail(e.target.value)}
                                    placeholder="your@email.com"
                                />
                            </FormControl>
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(90deg, #57B9FF 0%, #3A8DFF 100%)',
                                color: 'white',
                                py: 1.5
                            }}
                            type="submit"
                        >
                            Place Order
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}
export default OrderModal;