import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface OrderMonthSelectorProps {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

const OrderMonthSelector: React.FC<OrderMonthSelectorProps> = ({ selectedMonth, setSelectedMonth }) => (
  <FormControl fullWidth size="small">
    <InputLabel id="month-select-label">Month</InputLabel>
    <Select
      labelId="month-select-label"
      value={selectedMonth}
      label="Month"
      onChange={e => setSelectedMonth(Number(e.target.value))}
      sx={{ borderRadius: 2, bgcolor: '#f7fafd' }}
    >
      {months.map((month, idx) => (
        <MenuItem key={month} value={idx}>{month}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default OrderMonthSelector;