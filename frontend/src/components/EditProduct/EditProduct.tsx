import * as React from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl as MuiFormControl, TextField, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { ProductType, BrandType, CategoryType } from '../../utils/types/types';
import { api } from '../../api/api';

interface EditProductModalProps {
    open: boolean;
    onClose: () => void;
    product: ProductType;
    brands: BrandType[];
    categories: CategoryType[];
    onEditSuccess?: () => void;
}

const EditProduct: React.FC<EditProductModalProps> = ({
    open,
    onClose,
    product,
    brands,
    categories,
    onEditSuccess
}) => {
    const [form, setForm] = React.useState({
        name: product.name,
        description: product.description || '',
        price: product.price,
        brandId: product.brand.brandId,
        categoryId: product.category.categoryId,
        imageUrl: product.imageUrl,
    });
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                description: product.description || '',
                price: product.price,
                brandId: product.brand.brandId,
                categoryId: product.category.categoryId,
                imageUrl: product.imageUrl,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSelect = (e: SelectChangeEvent) => {
        const name = e.target.name;
        setForm({ ...form, [name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.editProduct(product.productId, {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                brand: { brandId: Number(form.brandId) } as BrandType,
                category: { categoryId: form.categoryId } as CategoryType,
                imageUrl: form.imageUrl,
            });
            if (onEditSuccess) onEditSuccess();
            onClose();
        } catch (error) {
            // Optionally show error
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>Edit the product details below.</DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <TextField
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                multiline
                                minRows={2}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                        <MuiFormControl fullWidth>
                            <InputLabel id="brand-label">Brand</InputLabel>
                            <Select
                                labelId="brand-label"
                                name="brandId"
                                value={String(form.brandId)}
                                label="Brand"
                                onChange={handleSelect}
                                sx={{ background: '#f5faff', borderRadius: 2 }}
                            >
                                {brands.map((brand) => (
                                    <MenuItem key={brand.brandId} value={String(brand.brandId)}>
                                        {brand.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </MuiFormControl>
                        <MuiFormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                name="categoryId"
                                value={String(form.categoryId)}
                                label="Category"
                                onChange={handleSelect}
                                sx={{ background: '#f5faff', borderRadius: 2 }}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat.categoryId} value={String(cat.categoryId)}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </MuiFormControl>
                        <FormControl>
                            <FormLabel>Image URL</FormLabel>
                            <Input
                                name="imageUrl"
                                value={form.imageUrl}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(90deg, #57B9FF 0%, #3A8DFF 100%)',
                                color: 'white',
                                py: 1.5
                            }}
                            type="submit"
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
};

export default EditProduct;