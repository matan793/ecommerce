import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Container, Stepper, Step, StepLabel } from '@mui/material';
import { Grid } from '@mui/material';
import { apiClient } from '../../api/api';
import { Link, useNavigate } from 'react-router';

const RegisterPage: React.FC = () => {
    const [step, setStep] = useState(0);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthdate: '',
        password: '',
        street: '',
        city: '',
        country: '',
        postalCode: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateStep1 = () => {
        const { firstName, lastName, email, birthdate, password, phone } = form;
        if (!firstName || !lastName || !email || !birthdate || !password) {
            setError('All fields except phone number are required.');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (phone && !/^\+?\d{7,15}$/.test(phone)) {
            setError('Please enter a valid phone number.');
            return false;
        }
        setError(null);
        return true;
    };

    const validateStep2 = () => {
        const { street, city, country, postalCode } = form;
        if (!street || !city || !country || !postalCode) {
            setError('All address fields are required.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/register', {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phoneNumber: form.phone || null,
                birthdate: form.birthdate,
                password: form.password,
                address: {
                    street: form.street,
                    city: form.city,
                    country: form.country,
                    postalCode: form.postalCode,
                },
                
            });
            if (response.status === 201) {
                navigate('/login');
            } else {
                setError('Registration failed. Please check your details.');
            }
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                'Registration failed. Please check your details.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 0 && validateStep1()) {
            setStep(1);
        } else if (step === 1 && validateStep2()) {
            handleRegister();
        }
    };

    const handleBack = () => {
        setStep(0);
        setError(null);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
            sx={{
                background: 'linear-gradient(120deg, #fffbe6 0%, #f5e6ca 100%)',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="sm" sx={{ mt: 0 }}>
                <Paper
                    elevation={6}
                    sx={{
                        padding: { xs: 2, sm: 4 },
                        minWidth: { xs: 0, sm: 420 },
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.95)',
                        boxShadow: '0 8px 32px rgba(218,165,32,0.10)',
                    }}
                >
                    <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
                        <Step>
                            <StepLabel>Account Info</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Address</StepLabel>
                        </Step>
                    </Stepper>
                    <form onSubmit={handleNext}>
                        {step === 0 && (
                            <Grid container spacing={2}>
                                <Grid>
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        fullWidth
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid>
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        fullWidth
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        fullWidth
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid >
                                    <TextField
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        fullWidth
                                        value={form.phone}
                                        onChange={handleChange}
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                        placeholder="+123456789"
                                    />
                                </Grid>
                                <Grid >
                                    <TextField
                                        label="Birthdate"
                                        name="birthdate"
                                        type="date"
                                        fullWidth
                                        value={form.birthdate}
                                        onChange={handleChange}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid >
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        fullWidth
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {step === 1 && (
                            <Grid container spacing={2}>
                                <Grid >
                                    <TextField
                                        label="Street"
                                        name="street"
                                        fullWidth
                                        value={form.street}
                                        onChange={handleChange}
                                        required
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid >
                                    <TextField
                                        label="City"
                                        name="city"
                                        fullWidth
                                        value={form.city}
                                        onChange={handleChange}
                                        required
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid >
                                    <TextField
                                        label="Country"
                                        name="country"
                                        fullWidth
                                        value={form.country}
                                        onChange={handleChange}
                                        required
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                                <Grid >
                                    <TextField
                                        label="Postal Code"
                                        name="postalCode"
                                        fullWidth
                                        value={form.postalCode}
                                        onChange={handleChange}
                                        required
                                        sx={{ background: '#fffbe6', borderRadius: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            {step === 1 && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleBack}
                                    sx={{ borderRadius: 2, px: 4 }}
                                    disabled={loading}
                                >
                                    Back
                                </Button>
                            )}
                            <Box flex={1} />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    py: 1.2,
                                    px: 4,
                                    borderRadius: 2,
                                    background: 'linear-gradient(90deg, #fddfa1 0%, #ffe082 100%)',
                                    color: '#6d4c00',
                                    boxShadow: '0 2px 8px rgba(255, 215, 0, 0.15)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #ffe082 0%, #fddfa1 100%)',
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading
                                    ? 'Registering...'
                                    : step === 0
                                    ? 'Next'
                                    : 'Register'}
                            </Button>
                        </Box>
                    </form>
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2 }}
                    >
                        have a user?{' '}
                        <Link to="/login" style={{ color: '#6d4c00', fontWeight: 'bold', textDecoration: 'underline' }}>
                            Login here
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default RegisterPage;