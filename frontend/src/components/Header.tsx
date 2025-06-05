import { AppBar, Button, Typography, Box, Menu, MenuItem, IconButton, Link, Badge, Divider, ListItemIcon, Container } from "@mui/material"
import LinkBehaviour from "./LinkBehaviour";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from "../contexts/CartContext";
import { CartItem } from "../types/CartItem";
import headerLogo from '../assets/logo_transparent.png';
import { Menu as MuiMenu } from '@mui/material';

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();
    const [mainMenuAnchor, setMainMenuAnchor] = useState<null | HTMLElement>(null);
    const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(null);
    const isAdmin = user?.roles?.includes('Admin') ?? false; 

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMainMenuAnchor(event.currentTarget);
    };

    const handleMainMenuClose = () => {
        setMainMenuAnchor(null);
    };

    const handleMenuClick = (path: string) => {
        handleMainMenuClose();
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
        <AppBar position="fixed" sx={{ backgroundColor: '#FFF8F1', color: 'black', boxShadow: 'none', pt: 1 }}>
                <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', px: { xs: 2, sm: 3 } }}>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            onClick={handleMainMenuOpen}
                            sx={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: 'text.primary',
                                '&:focus': {
                                  outline: 'none',          // Remove the default blue outline
                                },
                                '&:hover': {
                                  backgroundColor: '#f0f0f0'
                                },
                                borderRadius: 1,
                                px: 2, // horizontal padding
                                py: 1  // vertical padding
                              }}
                        >
                            Dashboard
                        </IconButton>
                        <MuiMenu
                            anchorEl={mainMenuAnchor}
                            open={Boolean(mainMenuAnchor)}
                            onClose={handleMainMenuClose}
                        >
                        { isAdmin ? [                                                              
                                <MenuItem
                                    key={'catalogue'}
                                    component={LinkBehaviour} 
                                    to='admin/catalogue' 
                                    onClick={handleMainMenuClose}
                                >
                                    Catalogue
                                </MenuItem>,
                                <MenuItem
                                    key={'orders'}
                                    component={LinkBehaviour} 
                                    to='admin/orders' 
                                    onClick={handleMainMenuClose}
                                >
                                    Orders
                                </MenuItem>,
                                <MenuItem
                                    key={'retailer-list'}
                                    component={LinkBehaviour} 
                                    to='admin/users' 
                                    onClick={handleMainMenuClose}
                                >
                                    Retailer List
                                </MenuItem>,
                                <MenuItem
                                    key={'insights'}
                                    component={LinkBehaviour} 
                                    to='admin/insights' 
                                    onClick={handleMainMenuClose}
                                >
                                    Business Insights
                                </MenuItem>,
                                <MenuItem
                                    key={'campaigns'}
                                    component={LinkBehaviour} 
                                    to='admin/campaigns' 
                                    onClick={handleMainMenuClose}
                                >
                                    Campaigns
                                </MenuItem>
                        ] : (
                            <MenuItem 
                                component={LinkBehaviour} 
                                to="/products" 
                                onClick={handleMainMenuClose}
                            >
                                Product List
                            </MenuItem>
                        )}
                        </MuiMenu>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <RouterLink to="/" style={{ display: 'block' }}>
                            <img src={headerLogo} alt="The Good Vitamin Co logo" style={{ width: 140, height: 'auto', display: 'block', cursor: 'pointer' }} />
                        </RouterLink>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                        {user ? (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <IconButton onClick={handleAvatarMenuOpen} color="inherit" size="large">
                                        <PersonIcon />
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
                                    { !isAdmin &&
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
                                                       backgroundColor: 'primary.main',
                                                       color: 'white'
                                                   }
                                               }}
                                           >
                                               <ShoppingCartIcon />
                                           </Badge>
                                       </IconButton>
                                    }
                                 
                                </Box>
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
                                    color="secondary"
                                >
                                    Login
                                </Button>
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
                                                backgroundColor: 'primary.main',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </Container>
        </AppBar>
    )
}

export default Header;