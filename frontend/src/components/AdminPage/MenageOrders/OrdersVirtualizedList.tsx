import React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import OrderListItem from './OrderListItem';
import { OrderType } from '../../../utils/types/types';
import { Divider } from '@mui/material';

interface OrdersVirtualizedListProps{
    orders: OrderType[];
}

const OrdersVirtualizedList: React.FC<OrdersVirtualizedListProps> = ({orders}) => (
  <List
    height={400}
    itemCount={orders.length}
    itemSize={80}
    width="100%"
  >
    {({ index, style }: ListChildComponentProps) => (
      <div style={{...style}}>
        <OrderListItem order={orders[index]} />
      </div>
    )}
  </List>
);

export default OrdersVirtualizedList;