import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, FormGroup, FormControlLabel, Menu, MenuItem, Switch, } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from '../../contexts';
import { apiClient } from '../../api/api';
import { Link, useNavigate } from 'react-router';

interface NavbarMenuItem {
    title: string;
    onClick: () => void;
}

interface NavbarProps {
    menuButtonCallback?: () => void;
    menuItems?: NavbarMenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ menuButtonCallback, menuItems }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { user, setUser, loading } = useUser();
    const navigate = useNavigate();


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };



    const handleClose = () => {
        setAnchorEl(null);
    };

    const profile = () => (<div style={{ flexGrow: 1, textAlign: 'right' }}>
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
            {menuItems && menuItems.map((item, index) => (
                <MenuItem key={index} onClick={(e) => { item.onClick(); handleClose(); }}>
                    {item.title}
                </MenuItem>
            ))}
        </Menu>
    </div>);

    const notLoggedIn = () => (
                            <><Typography variant = "body1" sx = {{ flexGrow: 1, textAlign: 'right' }}>
                    <Button color="inherit" onClick={() => { navigate('/login'); }}>
                        Login
                    </Button>
                </Typography><Typography variant="body1" sx={{ textAlign: 'right' }}>
                    <Button color="inherit" onClick={() => { navigate('/register'); }}>
                        register
                    </Button>
                </Typography></>
    )

    const handleLoad = () => {
        if(loading) 
            return <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'right' }}>Loading...</Typography>;
        else if (user) {
            return profile();
        }
        else {
            return notLoggedIn();
        }
    }
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar sx={{ gap: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ cursor: "default" }} component="div" >Matan Parfumerie</Typography>
                    <Button color='inherit' variant="text" component="div" onClick={() => { navigate('/') }} >
                        Perfumes
                    </Button>
                    <Button color='inherit' variant="text" component="div" onClick={() => { navigate('/brands') }} >
                        Brands
                    </Button>
                     {user ? (profile()) : (notLoggedIn())}

        </Toolbar >
            </AppBar >
        </>
    );
};

export default Navbar;