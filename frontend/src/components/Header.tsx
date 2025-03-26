import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material"

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    .Net React Store
                </Typography>
                <Button color="inherit" component={Link} to="/products">Products</Button>
                <Button color="inherit" component={Link} to="/cart">Cart</Button>
                <Button color="inherit" component={Link} to="/checkout">Checkout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;