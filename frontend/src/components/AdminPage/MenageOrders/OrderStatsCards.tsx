import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { StatsType } from '../../../hooks/useStats';
import OrderMonthSelector from './OrderMonthSelector';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface OrderStatsCardsProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  stats: StatsType;
}

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        height: '100%',
        px: 2,
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Box mr={1}>{icon}</Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </Card>
  );
};

const OrderStatsCards: React.FC<OrderStatsCardsProps> = ({
  selectedMonth,
  setSelectedMonth,
  stats,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          title="Total Sales"
          value={stats.toalOrders}
          icon={<TrendingUpIcon color="primary" />}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={<AttachMoneyIcon color="success" />}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 3,
            height: '100%',
            px: 2,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box display="flex" alignItems="center" mb={1}>
            <CalendarMonthIcon color="secondary" sx={{ mr: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Monthly Sales
            </Typography>
          </Box>

          <OrderMonthSelector
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />

          <Box mt={2}>
            <Typography variant="body1">
              Orders: <strong>{stats.monthOrders}</strong>
            </Typography>
            <Typography variant="body1">
              Revenue:{' '}
              <strong>${stats.monthRevenue.toLocaleString()}</strong>
            </Typography>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OrderStatsCards;
