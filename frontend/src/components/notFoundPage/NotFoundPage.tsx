import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

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
                }}
            >
                <Typography variant="h1" color="#6d4c00" fontWeight="bold" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" color="#7c6f57" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Sorry, the page you are looking for does not exist.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(90deg, #fddfa1 0%, #ffe082 100%)',
                        color: '#6d4c00',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        px: 4,
                        py: 1.2,
                        boxShadow: '0 2px 8px rgba(255, 215, 0, 0.15)',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #ffe082 0%, #fddfa1 100%)',
                        },
                    }}
                    onClick={() => navigate('/')}
                >
                    Go Home
                </Button>
            </Box>
        </>
    );
};

export default NotFoundPage;