import React, { useState, useEffect } from 'react';
import {
    Box, TextField, Button, Typography, Paper, Container,
    Stepper, Step, StepLabel, Grid
} from '@mui/material';
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
            } else if(response.status === 400){
                setError('Registration failed. email allready exists.');
            } 
            else {
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
            sx={{
                background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)',
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={6}
                    sx={{
                        padding: { xs: 2, sm: 4 },
                        minWidth: { xs: 0, sm: 420 },
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.95)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        border: '1px solid #e0e0e0',
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
                        <Grid container spacing={2}>
                            {step === 0 && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="First Name" name="firstName" fullWidth required
                                            value={form.firstName} onChange={handleChange}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Last Name" name="lastName" fullWidth required
                                            value={form.lastName} onChange={handleChange}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Email" name="email" type="email" fullWidth required
                                            value={form.email} onChange={handleChange}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Phone Number" name="phone" type="tel" fullWidth
                                            value={form.phone} onChange={handleChange}
                                            placeholder="+123456789"
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Birthdate" name="birthdate" type="date" fullWidth required
                                            value={form.birthdate} onChange={handleChange}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Password" name="password" type="password" fullWidth required
                                            value={form.password} onChange={handleChange}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                </>
                            )}
                            {step === 1 && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField label="Street" name="street" fullWidth required
                                            value={form.street} onChange={handleChange}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="City" name="city" fullWidth required
                                            value={form.city} onChange={handleChange}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField label="Country" name="country" fullWidth required
                                            value={form.country} onChange={handleChange}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label="Postal Code" name="postalCode" fullWidth required
                                            value={form.postalCode} onChange={handleChange}
                                            sx={{ background: '#fff', borderRadius: 2 }} />
                                    </Grid>
                                </>
                            )}
                        </Grid>
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
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    py: 1.2,
                                    px: 4,
                                    borderRadius: 2,
                                    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                                    color: '#fff',
                                    boxShadow: '0 4px 14px rgba(25, 118, 210, 0.2)',
                                    '&:hover': {
                                        background: 'linear-gradient(90deg, #42a5f5 0%, #1976d2 100%)',
                                    },
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : step === 0 ? 'Next' : 'Register'}
                            </Button>
                        </Box>
                    </form>
                    <Typography variant="body2" align="center" sx={{ mt: 2, color: '#555' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'underline' }}>
                            Login here
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default RegisterPage;
