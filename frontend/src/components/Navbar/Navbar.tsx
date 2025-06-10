import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, FormGroup, FormControlLabel, Menu, MenuItem, Switch, } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from '../../contexts';
import { apiClient } from '../../api/api';

const Navbar: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { user, setUser } = useUser();


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    
    const handleLogout = async () => {
        try {
            const res = await apiClient.post('/auth/logout', {withCredentials: true});
            if (res.status === 200) {
                setUser(null);
            } else {
                // Handle error case
                console.error('Logout failed', res);
            }
        } catch (error) {
            console.error('Logout failed', error);

        } finally {
            handleClose();
        }
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar sx={{gap: 4, display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button color='inherit' variant="text" component="div" >
                        Perfumes
                    </Button>
                    <Button color='inherit'  variant="text" component="div" >
                        Men's Perfumes
                    </Button>
                    <Button color='inherit' variant="text" component="div">
                        Woman's Perfumes
                    </Button>
                    <Button color='inherit' variant="text" component="div">
                        Brands
                    </Button>
                    {user ? (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Mt account</MenuItem>
                                <MenuItem onClick={handleLogout}>logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'right' }}>
                            <Button color="inherit" href="/login">
                                Login
                            </Button>
                        </Typography>
                    )}
                    
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;