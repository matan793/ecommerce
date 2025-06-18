import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import OrderStatsCards from './OrderStatsCards';
import OrdersVirtualizedList from './OrdersVirtualizedList';
import { useOrders } from '../../../hooks/useOrders';
import { api } from '../../../api/api';
import { useStats } from '../../../hooks/useStats';



const MenageOrders: React.FC = () => {
    const { orders } = useOrders();
    const { stats, selectedMonth, setSelectedMonth, setStats } = useStats();
    useEffect(() => {
        if (orders) {
            setStats({ ...stats, toalOrders: orders.length })
        }
    }, [orders, orders.length])
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: "100%",
                background: 'linear-gradient(120deg, #f7fafd 0%, #e3e8ee 100%)',
                py: 6,
                px: 15,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            <OrderStatsCards stats={stats} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <Paper sx={{ mt: 4, borderRadius: 4, p: 2, boxShadow: '0 2px 16px rgba(30, 60, 90, 0.07)' }}>
                <OrdersVirtualizedList orders={orders} />
            </Paper>
        </Box>
    );
};

export default MenageOrders;