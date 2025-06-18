import React from 'react';
import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { OrderStatus, OrderType } from '../../../utils/types/types';

interface OrderListItemProps {
  order: OrderType;
}

const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  const formattedDateTime = new Date(order.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getStatusChipColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.delivered:
        return 'success';
      case OrderStatus.pending:
        return 'info';
      case OrderStatus.cancelled:
        return 'error';
      case OrderStatus.processing:
        return 'warning';
      default:
        return 'default';
    }
  };

  const fullName = `${order.user.firstName} ${order.user.lastName}`;
  const itemCount = order.items.length;
  const paymentStatus = order.payments[0]?.paymentStatus || 'N/A';
  const paymentMethod = order.payments[0]?.paymentMethod || 'N/A';
  const addressLine = `${order.address.street}, ${order.address.city}`;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3,
        py: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
        },
      }}
    >
      <Box sx={{ minWidth: 200 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Order #{order.orderId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fullName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formattedDateTime}
        </Typography>
      </Box>

      <Box sx={{ minWidth: 250, textAlign: 'center' }}>
        <Typography variant="body2">
          {itemCount} item{itemCount !== 1 ? 's' : ''} – {addressLine}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Payment: {paymentMethod} – {paymentStatus}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          ${order.totalAmount.toFixed(2)}
        </Typography>
        <Chip
          label={order.status.replace(/_/g, ' ').toUpperCase()}
          color={getStatusChipColor(order.status)}
          size="small"
        />
        <Tooltip title="View Order Details">
          <IconButton size="small">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default OrderListItem;
