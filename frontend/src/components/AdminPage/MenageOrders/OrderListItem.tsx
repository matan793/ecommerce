import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import { OrderStatus, OrderType } from '../../../utils/types/types';

interface OrderListItemProps {
    order: OrderType;
}

const statusColor: Record<OrderStatus, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
    [OrderStatus.pending]: 'warning',
    [OrderStatus.processing]: 'primary',
    [OrderStatus.cancelled]: 'error',
    [OrderStatus.delivered]: 'success',
};



const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
    console.log(order);
    return <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            borderBottom: '1px solid #e3e8ee',
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: 1,
            mb: 1,
        }}
    >
        <Box>
            <Typography variant="subtitle1" fontWeight={600}>Order #{order.orderId}</Typography>
            <Typography variant="body2" color="text.secondary">{order.user.firstName}</Typography>
            <Typography variant="body2" color="text.secondary">{order.createdAt.toLocaleString()}</Typography>
        </Box>
        <Box>
            <Typography variant="subtitle1" fontWeight={700}>${order.totalAmount}</Typography>
        </Box>
        <Box>
            <Chip label={order.status} color={statusColor[order.status] || 'default'} />
        </Box>
        <Box>
            <Button variant="outlined" size="small">View</Button>
        </Box>
    </Box>
};

export default OrderListItem;