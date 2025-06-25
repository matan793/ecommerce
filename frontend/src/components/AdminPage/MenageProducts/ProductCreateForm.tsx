import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, MenuItem } from '@mui/material';
import { BrandType, CategoryType } from '../../../utils/types/types';
import { toast } from 'react-toastify';
import { apiClient } from '../../../api/api';
import { useProducts } from '../../../hooks/useProducts';
import FilterBar from '../../filterBar/FilterBar';

interface ProductCreateFormProps {
    brands: BrandType[];
    categories: CategoryType[];
}

const initialForm = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    brandId: '',
    categoryId: '',
};

const ProductCreateForm: React.FC<ProductCreateFormProps> = ({ brands, categories }) => {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState<File | null>(null);
    const {fetchProducts} = useProducts();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please select an image file.');
            return;
        }
        try {
            const payload = new FormData();
            payload.append('file', file);
            payload.append(
                'product',
                JSON.stringify({
                    name: form.name,
                    description: form.description,
                    brandId: Number(form.brandId),
                    price: Number(form.price),
                    stockQuantity: Number(form.stockQuantity),
                    categoryId: Number(form.categoryId),
                })
            );
            await apiClient.post('/products', payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Product created!');
            setForm(initialForm);
            setFile(null);
            fetchProducts();
        } catch (error) {
            toast.error('Failed to create product');
            console.log(error);

        }
    };

    return (
       <Paper sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 2px 16px rgba(30, 60, 90, 0.07)', border: '1px solid #e3e8ee' }}>
            <Typography variant="h5" fontWeight={700} mb={3} color="#2563eb">
                Create New Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid>
                        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid>
                        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid>
                        <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline minRows={2} />
                    </Grid>
                    <Grid sx={{ width: 220 }}>
                        <TextField
                            select
                            label="Brand"
                            name="brandId"
                            value={form.brandId}
                            onChange={handleSelect}
                            fullWidth
                            required
                        >
                            {brands.map((brand) => (
                                <MenuItem key={brand.brandId} value={brand.brandId}>
                                    {brand.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid sx={{ width: 220 }}>
                        <TextField
                            select
                            label="Category"
                            name="categoryId"
                            value={form.categoryId}
                            onChange={handleSelect}
                            fullWidth
                            required
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid>
                        <TextField
                            label="Stock Quantity"
                            name="stockQuantity"
                            type="number"
                            value={form.stockQuantity}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{
                                mt: 1,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2.5,
                                background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
                                color: '#fff',
                                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.10)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)',
                                },
                            }}
                            fullWidth
                        >
                            {file ? file.name : 'Upload Image'}
                            <input
                                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                type="file"
                                hidden
                                accept="image/*"
                            />
                        </Button>
                    </Grid>
                    <Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 1,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2.5,
                                background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
                                color: '#fff',
                                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.10)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)',
                                },
                            }}
                            fullWidth
                        >
                            Create Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default ProductCreateForm;