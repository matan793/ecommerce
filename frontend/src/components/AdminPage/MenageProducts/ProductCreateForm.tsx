import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid, MenuItem } from '@mui/material';
import { BrandType, CategoryType } from '../../../utils/types/types';
import { toast } from 'react-toastify';
import { apiClient } from '../../../api/api';

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
        } catch (error) {
            toast.error('Failed to create product');
            console.log(error);

        }
    };

    return (
        <Paper sx={{ p: 4, borderRadius: 4, background: 'rgba(255,255,255,0.97)' }}>
            <Typography variant="h5" fontWeight={700} mb={3}>
                Create New Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline minRows={2} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                                <MenuItem key={brand} value={brand.brandId}>
                                    {brand.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            component="label"
                            sx={{
                                mt: 1,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2,
                                background: 'linear-gradient(90deg, #fddfa1 0%, #ffe082 100%)',
                                color: '#6d4c00',
                                boxShadow: '0 2px 8px rgba(255, 215, 0, 0.15)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #ffe082 0%, #fddfa1 100%)',
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
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2,
                                background: 'linear-gradient(90deg, #fddfa1 0%, #ffe082 100%)',
                                color: '#6d4c00',
                                boxShadow: '0 2px 8px rgba(255, 215, 0, 0.15)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #ffe082 0%, #fddfa1 100%)',
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