import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { apiClient } from '../../api/api';
import { useUser } from '../../contexts';
import { useNavigate } from 'react-router';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, setUser} = useUser()
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            if (response.status === 200) {
                const userData = response.data;
                setUser(userData);
                console.log('Login successful:', userData);
                navigate('/'); // Redirect to home page after successful login
                // Redirect or perform any other action after successful login
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (err) {
            console.error('Login failed:', err);
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ padding: 4, minWidth: 320 }}>
                <Typography variant="h5" mb={2} align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;