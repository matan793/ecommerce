import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, Divider, Card, CardContent } from '@mui/material';
import { useUser } from '../../contexts/userContext';
import { apiClient } from '../../api/api';
import { toast } from 'react-toastify';

const ProfilePage: React.FC = () => {
    const { user, fetchUser, loading } = useUser();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        phoneNumber: '',
        address: {
            street: '',
            city: '',
            country: '',
            postalCode: '',
        },
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                birthdate: user.birthdate
                    ? new Date(user.birthdate).toISOString().slice(0, 10)
                    : '',
                phoneNumber: user.phoneNumber || '',
                address: {
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    country: user.address?.country || '',
                    postalCode: user.address?.postalCode || '',
                },
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in form.address) {
            setForm(prev => ({
                ...prev,
                address: { ...prev.address, [name]: value }
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            // flatten address fields for backend
            const res = await apiClient.post('/users/update', {
                ...form,
                ...form.address,
            });
            if (res.status === 200) {
                toast.success('Profile updated!');
                fetchUser();
            } else {
                toast.error('Failed to update profile');
            }
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #f1f4f8 0%, white 100%)',
                py: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Card
                elevation={10}
                sx={{
                    maxWidth: 650,
                    width: '100%',
                    borderRadius: 5,
                    boxShadow: '0 8px 32px rgba(218,165,32,0.13)',
                    background: 'rgba(255,255,255,0.98)',
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        mb={2}
                        textAlign="center"
                        sx={{
                            fontWeight: 700,
                            color: '#2867ec',
                            letterSpacing: 1,
                        }}
                    >
                        My Profile
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <form onSubmit={handleSave}>
                        <Grid container spacing={3} sx={{ml: 2}}>
                            {/* Personal Info */}
                            <Grid>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{  borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{  borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    type="email"
                                    sx={{  borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="Birthdate"
                                    name="birthdate"
                                    value={form.birthdate}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{  borderRadius: 2 }}
                                />
                            </Grid>
                            <Grid>
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{  borderRadius: 2 }}
                                />
                            </Grid>
                        </Grid>

                        {/* Address Section */}
                        <Box
                            sx={{
                                mt: 0,
                                mb: 2,
                                px: 2,
                                py: 3,
                                // background: 'linear-gradient(90deg, #5fa4fa 0%, #2867ec 100%)',
                                borderRadius: 3,
                                boxShadow: '0 2px 8px rgba(218,165,32,0.07)',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'black',
                                    fontWeight: 600,
                                    mb: 2,
                                    letterSpacing: 1,
                                    
                                }}
                            >
                                Address
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid  >
                                    <TextField
                                    variant='outlined'
                                        label="Street"
                                        name="street"
                                        value={form.address.street}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        sx={{ background: '#fff', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid  >
                                    <TextField
                                        label="City"
                                        name="city"
                                        value={form.address.city}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        sx={{ background: '#fff', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid  >
                                    <TextField
                                        label="Country"
                                        name="country"
                                        value={form.address.country}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        sx={{ background: '#fff', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid  >
                                    <TextField
                                        label="Postal Code"
                                        name="postalCode"
                                        value={form.address.postalCode}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        sx={{ background: '#fff', borderRadius: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={saving}
                            sx={{
                                mt: 3,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2,
                                background: 'linear-gradient(90deg, #5fa4fa 0%, #2867ec 100%)',
                                color: 'white',
                                boxShadow: '0 2px 8px rgba(255, 215, 0, 0.15)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #5fa4fa 0%, #2867ec 100%)',
                                },
                            }}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfilePage;