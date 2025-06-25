import { List, ListItemButton, ListItemText, Box } from '@mui/material';

interface ProductSidebarProps {
  selected: number;
  onSelect: (index: number) => void;
}

const options = ['Create Product', 'Manage Products'];

const ProductSidebar: React.FC<ProductSidebarProps> = ({ selected, onSelect }) => (
  <Box
    sx={{
      width: 240,
      bgcolor: '#f7fafd',
      height: '100%',
      borderRadius: 4,
      p: 2.5,
      boxShadow: '0 2px 16px rgba(30, 60, 90, 0.07)',
      border: '1px solid #e3e8ee',
    }}
  >
    <List>
      {options.map((text, idx) => (
        <ListItemButton
          key={text}
          selected={selected === idx}
          onClick={() => onSelect(idx)}
          sx={{
            borderRadius: 2.5,
            mb: 1,
            fontWeight: 600,
            bgcolor: selected === idx ? '#2563eb22' : 'transparent',
            color: selected === idx ? '#2563eb' : '#222',
            transition: 'background 0.2s, color 0.2s',
            '&:hover': {
              bgcolor: '#2563eb11',
              color: '#2563eb',
            },
          }}
        >
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  </Box>
);

export default ProductSidebar;