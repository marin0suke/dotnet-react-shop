import { AppBar, Button, Toolbar, Typography, Box, Menu, MenuItem, IconButton, Link, Badge } from "@mui/material"
import LinkBehaviour from "./LinkBehaviour";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../contexts/CartContext";
import { CartItem } from "../types/CartItem";

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isAdmin = user?.roles?.includes('Admin');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (path: string) => {
        handleMenuClose();
        navigate(path);
    };

    const cartItemsCount = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black' }}>
            <Toolbar>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        color: 'black', 
                        fontFamily: '"Caveat", cursive', 
                        fontSize: '2.2rem', 
                        letterSpacing: '0.05em', 
                        fontWeight: 400 
                    }}
                >
                    Vitamin & Co
                </Typography>
                {user && (
                    <Typography variant="body1" sx={{ ml: 2 }}>
                        Welcome{user.userName ? `, ${user.userName}` : '!'}
                    </Typography>
                )}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {isAdmin ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton
                                color="inherit"
                                onClick={handleMenuOpen}
                                size="large"
                                sx={{ mr: 1 }}
                            >
                                <DashboardIcon />
                            </IconButton>
                            <Button color="inherit" component={LinkBehaviour} to="/admin/catalogue">Catalogue</Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => handleMenuClick('/admin/dashboard')}>Dashboard</MenuItem>
                                <MenuItem onClick={() => handleMenuClick('/admin/catalogue')}>Catalogue</MenuItem>
                                <MenuItem onClick={() => handleMenuClick('/admin/orders')}>Orders</MenuItem>
                                <MenuItem onClick={() => handleMenuClick('/admin/users')}>Users</MenuItem>
                                <MenuItem onClick={() => handleMenuClick('/admin/settings')}>Settings</MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            <Button color="inherit" component={LinkBehaviour} to="/products">Products</Button>
                            <IconButton 
                                color="inherit" 
                                component={LinkBehaviour} 
                                to="/cart"
                                size="large"
                            >
                                <Badge 
                                    badgeContent={cartItemsCount} 
                                    color="primary"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            backgroundColor: '#1976d2',
                                            color: 'white'
                                        }
                                    }}
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </>
                    )}
                </Box>
                {user ? (
                    <>
                       <Button color="inherit" component={LinkBehaviour} to="/profile">Profile</Button>
                       <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Link
                            component={LinkBehaviour}
                            to="/register"
                            sx={{
                                color: 'black',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }}
                        >
                            Register
                        </Link>
                        <Button 
                            variant="contained"
                            component={LinkBehaviour} 
                            to="/login"
                            sx={{
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0'
                                }
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header;