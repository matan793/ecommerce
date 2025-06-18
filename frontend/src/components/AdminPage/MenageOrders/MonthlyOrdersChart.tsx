import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { MonthlyOrderStats } from '../../../utils/types/types';

interface MonthlyOrdersChartProps {
  data: MonthlyOrderStats[];
}

const MonthlyOrdersChart: React.FC<MonthlyOrdersChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={(month) =>
            new Date(0, month - 1).toLocaleString('default', { month: 'short' })
          }
        />
        <YAxis allowDecimals={false} />
        <Tooltip
          labelFormatter={(month) =>
            `Month: ${new Date(0, month - 1).toLocaleString('default', { month: 'long' })}`
          }
          formatter={(value: number) => [`${value} orders`, 'Orders']}
        />
        <Line 
          type="monotone" 
          dataKey="orderCount" 
          stroke="#1976d2" 
          strokeWidth={3}
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyOrdersChart;
