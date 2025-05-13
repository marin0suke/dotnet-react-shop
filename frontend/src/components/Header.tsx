import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material"
import LinkBehaviour from "./LinkBehaviour";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    .Net React Store
                </Typography>
                {user && (
                    <Typography variant="body1" sx={{ mr: 2 }}>
                        Welcome{user.name ? `, ${user.name}` : '!'}
                    </Typography>
                )}
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
                            component={LinkBehaviour} 
                            to="/login"
                        >
                            Login
                        </Button>
                        <Button 
                            color="inherit" 
                            component={LinkBehaviour} 
                            to="/register"
                        >
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header;