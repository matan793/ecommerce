import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { api, apiClient } from '../../api/api';
import { useUser } from '../../contexts/userContext';
import { Link, useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

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

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { setUser, fetchUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, []);

    const validate = () => {
        if (!email || !password) {
            setError('Email and password are required.');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            if (response.status === 200) {
                const userData = response.data;
                setUser(userData);
                navigate('/');
                fetchUser();
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    };

    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        try {
            const data = await api.loginWithGoogle(credentialResponse.credential);
            setUser(data);
            navigate('/');
            fetchUser();
            console.log(data);

        } catch (error) {
            toast.error('error with google login');
            console.log(error);
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                height="100vh"
                bgcolor="#f5f5f5"
                sx={{
                    background: 'linear-gradient(120deg, #fffbe6 0%, #f5e6ca 100%)',
                    overflow: 'hidden',
                }}
            >
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
                        <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
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
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            Not registered yet?{' '}
                            <Link to="/register" style={{ color: '#6d4c00', fontWeight: 'bold', textDecoration: 'underline' }}>
                                Register here
                            </Link>
                        </Typography>
                    </Paper>
                </Container>

            </Box>
        </>
    );
};

export default LoginPage;