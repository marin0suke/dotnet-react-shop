import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductsList';
import ProductPage from './components/ProductPage';
import CartDisplay from './components/CartDisplay';
import CheckoutPage from './components/CheckoutPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProfilePage from './components/ProfilePage';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {

  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <div>
            <Header />
            <main>
              <Routes>
                <Route path="*" element={<ProductList />} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/products/:id' element={<ProductPage />} />
                <Route path='/cart' element={<CartDisplay />} />
                <Route path='/checkout' element={<CheckoutPage />} />
                <Route path='/login' element={<LoginForm />}/>
                <Route path='/register' element={<RegisterForm />}/>
                <Route path='/profile' element={<ProfilePage />}/>
              </Routes>
            </main>
          </div>
        </CartProvider>
       
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
