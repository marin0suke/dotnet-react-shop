import { AppBar, Button, Toolbar, Typography, Box, Menu, MenuItem, IconButton, Link, Badge, Avatar, Divider, ListItemIcon } from "@mui/material"
import LinkBehaviour from "./LinkBehaviour";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from "../contexts/CartContext";
import { CartItem } from "../types/CartItem";

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(null);
    const isAdmin = user?.roles?.includes('Admin') ?? false;

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

    const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAvatarMenuAnchor(event.currentTarget);
    };

    const handleAvatarMenuClose = () => {
        setAvatarMenuAnchor(null);
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
                        fontWeight: 400, 
                        flexShrink: 0
                    }}
                >
                    Vitamin & Co
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 3 }}>
                    {isAdmin ? (
                        <>
                            <Button color="inherit" component={LinkBehaviour} to="/admin/dashboard">Dashboard</Button>
                            <Button color="inherit" component={LinkBehaviour} to="/admin/catalogue">Catalogue</Button>
                            <Button color="inherit" component={LinkBehaviour} to="/admin/orders">Orders</Button>
                            <Button color="inherit" component={LinkBehaviour} to="/admin/users">Users</Button>
                            <Button color="inherit" component={LinkBehaviour} to="/admin/campaigns">Campaigns</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={LinkBehaviour} to="/products">Product List</Button>
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
                        <IconButton onClick={handleAvatarMenuOpen} sx={{ ml: 2 }}>
                            <Avatar sx={{ width: 36, height: 36 }}>
                                <PersonIcon />
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={avatarMenuAnchor}
                            open={Boolean(avatarMenuAnchor)}
                            onClose={handleAvatarMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon fontSize="large" />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>{user.userName || user.email}</Typography>
                                    <Typography variant="body2" color="text.secondary">({isAdmin ? 'Admin' : 'User'})</Typography>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <MenuItem onClick={() => { handleAvatarMenuClose(); navigate('/profile'); }}>
                                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => { handleAvatarMenuClose(); navigate('/settings'); }}>
                                <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={() => { handleAvatarMenuClose(); handleLogout(); }}>
                                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
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