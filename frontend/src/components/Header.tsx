import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import LinkBehaviour from "./LinkBehaviour";

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    .Net React Store
                </Typography>
                <Button color="inherit" component={LinkBehaviour} to="/products">Products</Button>
                <Button color="inherit" component={LinkBehaviour} to="/cart">Cart</Button>
                <Button color="inherit" component={LinkBehaviour} to="/checkout">Checkout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;