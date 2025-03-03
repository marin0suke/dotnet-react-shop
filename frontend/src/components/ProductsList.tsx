import { useState, useEffect } from "react";
import api from "../api";

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
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <img src={product.imageUrl} alt={product.name} width="150" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;