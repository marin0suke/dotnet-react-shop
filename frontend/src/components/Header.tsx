import { AppBar, Button, Toolbar, Typography, Menu, MenuItem } from "@mui/material"
import LinkBehaviour from "./LinkBehaviour";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [authAnchorEl, setAuthAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleAuthClick = (event: React.MouseEvent<HTMLElement>) => {
        setAuthAnchorEl(event.currentTarget);
    };

    const handleAuthClose = () => {
        setAuthAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleAuthClose();
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    .Net React Store
                </Typography>
                <Button color="inherit" component={LinkBehaviour} to="/products">Products</Button>
                <Button color="inherit" component={LinkBehaviour} to="/cart">Cart</Button>
                {user ? (
                    <>
                        <Button color="inherit" component={LinkBehaviour} to="/profile">Profile</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button 
                            color="inherit" 
                            onClick={handleAuthClick}
                        >
                            Login
                        </Button>
                        <Menu
                            anchorEl={authAnchorEl}
                            open={Boolean(authAnchorEl)}
                            onClose={handleAuthClose}
                        >
                            <MenuItem 
                                onClick={() => {
                                    navigate('/login');
                                    handleAuthClose();
                                }}
                            >
                                Login
                            </MenuItem>
                            <MenuItem 
                                onClick={() => {
                                    navigate('/register');
                                    handleAuthClose();
                                }}
                            >
                                Register
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header;