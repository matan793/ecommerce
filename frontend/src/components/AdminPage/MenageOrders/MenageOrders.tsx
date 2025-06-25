import React, { useEffect, useState } from 'react';
import { Box, Paper, CircularProgress, Typography, TextField } from '@mui/material';
import OrderStatsCards from './OrderStatsCards';
import OrdersVirtualizedList from './OrdersVirtualizedList';
import { useOrders } from '../../../hooks/useOrders';
import { api } from '../../../api/api';
import { useStats } from '../../../hooks/useStats';
import MonthlyOrdersChart from './MonthlyOrdersChart';
import { MonthlyOrderStats } from '../../../utils/types/types';
import { useGetMonthlyData } from '../../../hooks/useGetMonthlyData';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MenageOrders: React.FC = () => {
    const { orders } = useOrders();
    const { stats, selectedMonth, setSelectedMonth, setStats } = useStats();
    const { year, setYear, data, loading, error } = useGetMonthlyData();
    const currentYear = dayjs();

    // As discussed previously, this useEffect should ideally be handled within useStats
    // if 'toalOrders' is meant to be derived from the 'orders' array.
    // If 'toalOrders' comes from a separate API call within useStats, then this is redundant.
    useEffect(() => {
        if (orders) {
            setStats(prevStats => ({ ...prevStats, toalOrders: orders.length }));
        }
    }, [orders, orders.length, setStats]); // Added setStats to dependency array

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
            {/* Container for OrderStatsCards and MonthlyOrdersChart */}
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px', minWidth: 300 }}> {/* Adjust flex basis as needed */}
                    <OrderStatsCards stats={stats} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                </Box>

                <Paper sx={{
                    flex: '2 1 600px', // Adjust flex basis as needed
                    minWidth: 600,
                    p: 3,
                    borderRadius: 4,
                    boxShadow: '0 2px 16px rgba(30, 60, 90, 0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'flex-start' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={dayjs().year(year)} // Set the DatePicker's value based on the 'year' state
                                onChange={(newValue) => setYear(newValue?.year() || new Date().getFullYear())} // Update 'year' state
                                label="select year"
                                maxDate={currentYear}
                                openTo="year"
                                views={['year']}
                                yearsOrder="desc"
                                sx={{ minWidth: 250 }}
                            />
                        </LocalizationProvider>
                    </Box>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <MonthlyOrdersChart data={data} />
                    )}
                </Paper>
            </Box>

            <Paper sx={{ mt: 4, borderRadius: 4, p: 2, boxShadow: '0 2px 16px rgba(30, 60, 90, 0.07)' }}>
                {/* Title for the Order List */}
                <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                    All Orders
                </Typography>
                <OrdersVirtualizedList orders={orders} />
            </Paper>
        </Box>
    );
};

export default MenageOrders;