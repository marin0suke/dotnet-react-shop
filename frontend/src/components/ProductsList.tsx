import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";


export interface Product { 
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductList = () => {
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');
    const { addToCart } = useCart(); // custom hook from cartContext.

    useEffect(() => {
        api.get('/products')
            .then(response => {
                setProducts(response.data); // assumes response.data is an array of products.
            })
            .catch(err => {
                console.error("Error fetching products", err);
                setError("Failed to fetch products.");
            })
            .finally(() => setLoading(false));
    }, []); // useEffect runs only once.

    if (loading) return <div>Loading Products...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>
                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <img src={product.imageUrl} alt={product.name} width="150" />
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;