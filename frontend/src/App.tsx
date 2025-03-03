import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductList from './components/ProductsList';


function App() {
  return (
    <div>
      <header>
        <h1>.NET React Store</h1>
        <nav>
          <Link to='/products'>Products</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path='/products' element={<ProductList />} />
      </Routes>
    </div>
    
  )
}

export default App;
