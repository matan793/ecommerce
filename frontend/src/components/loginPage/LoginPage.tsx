import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';
import { api, apiClient } from '../../api/api';
import { useUser } from '../../contexts/userContext';
import { Link, useNavigate } from 'react-router';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

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
        } catch (error) {
            toast.error('Error with Google login');
            console.log(error);
        }
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
            <Container maxWidth="xs">
                <Paper
                    elevation={6}
                    sx={{
                        padding: 4,
                        minWidth: 340,
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                        border: '1px solid #e0e0e0',
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
                                background: '#ffffff',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#999',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                },
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
                                background: '#ffffff',
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#999',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1976d2',
                                    },
                                },
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
                            fullWidth
                            sx={{
                                mt: 3,
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                py: 1.2,
                                borderRadius: 2,
                                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                                color: '#fff',
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #42a5f5 0%, #1976d2 100%)',
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

                    <Typography variant="body2" align="center" sx={{ mt: 2, color: '#555' }}>
                        Not registered yet?{' '}
                        <Link
                            to="/register"
                            style={{
                                color: '#1976d2',
                                fontWeight: 'bold',
                                textDecoration: 'underline',
                            }}
                        >
                            Register here
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
