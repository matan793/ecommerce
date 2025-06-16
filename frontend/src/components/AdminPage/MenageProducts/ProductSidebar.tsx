import { List, ListItemButton, ListItemText, Box } from '@mui/material';

interface ProductSidebarProps {
  selected: number;
  onSelect: (index: number) => void;
}

const options = ['Create Product', 'Manage Products'];

const ProductSidebar: React.FC<ProductSidebarProps> = ({ selected, onSelect }) => (
  <Box sx={{ width: 220, bgcolor: '#f5e6ca', height: '100%', borderRadius: 3, p: 2 }}>
    <List>
      {options.map((text, idx) => (
        <ListItemButton
          key={text}
          selected={selected === idx}
          onClick={() => onSelect(idx)}
          sx={{
            borderRadius: 2,
            mb: 1,
            fontWeight: 600,
            bgcolor: selected === idx ? '#ffe082' : undefined,
            color: selected === idx ? '#6d4c00' : undefined,
          }}
        >
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  </Box>
);

export default ProductSidebar;