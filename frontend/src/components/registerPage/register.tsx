import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { apiClient } from '../../api/api';
import { Link, useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';

const bannerStyle: React.CSSProperties = {
    width: '100%',
    height: '180px',
    background: 'linear-gradient(90deg, #fddfa1 0%, #FFF8DC 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(255, 215, 0, 0.2)',
    overflow: 'hidden'
};

const RegisterPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Disable scrolling only on this page
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, []);

    const validate = () => {
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

    const handleRegister = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/register', {
                firstName,
                lastName,
                email,
                phone: phone || null,
                birthdate,
                password,
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister();
    };

    return (
        <>
            <Navbar />
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
                <div style={{ ...bannerStyle, height: '180px', width: 500, margin: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                        <img
                            src="/logo.png"
                            alt="Logo"
                            style={{
                                height: 120,
                                marginRight: 36,
                                filter: 'drop-shadow(0 4px 16px rgba(218,165,32,0.25))',
                                borderRadius: 12,
                                background: '#fff8dc',
                                padding: 8,
                            }}
                        />
                        <div>
                            <Typography variant="h3" fontWeight="bold" color="#6d4c00">
                                Create Account
                            </Typography>
                            <Typography variant="h6" color="#7c6f57">
                                Register for Matan Parfumerie
                            </Typography>
                        </div>
                    </div>
                </div>
                <Container maxWidth="xs" sx={{ mt: 0 }}>
                    <Paper
                        elevation={6}
                        sx={{
                            padding: 4,
                            minWidth: 340,
                            borderRadius: 4,
                            background: 'rgba(255,255,255,0.95)',
                            boxShadow: '0 8px 32px rgba(218,165,32,0.10)',
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="First Name"
                                fullWidth
                                margin="normal"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                sx={{
                                    background: '#fffbe6',
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                label="Last Name"
                                fullWidth
                                margin="normal"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                sx={{
                                    background: '#fffbe6',
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{
                                    background: '#fffbe6',
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                label="Phone Number"
                                type="tel"
                                fullWidth
                                margin="normal"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                sx={{
                                    background: '#fffbe6',
                                    borderRadius: 2,
                                }}
                                placeholder="+123456789"
                            />
                            <TextField
                                label="Birthdate"
                                type="date"
                                fullWidth
                                margin="normal"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                required
                              
                                slotProps={{inputLabel: { shrink: true }}}
                                sx={{
                                    background: '#fffbe6',
                                    borderRadius: 2,
                                }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{
                                    background: '#fffbe6',
                                    borderRadius: 2,
                                }}
                            />
                            {error && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {error}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    mt: 3,
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
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
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
        </>
    );
};

export default RegisterPage;