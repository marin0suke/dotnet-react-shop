import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductsList';
import ProductPage from './components/ProductPage';
import CartDisplay from './components/CartDisplay';
import CheckoutPage from './components/CheckoutPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Header from './components/Header';


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
          </Routes>
        </main>
      </div>
    </ThemeProvider>
   
  );
}

export default App;
