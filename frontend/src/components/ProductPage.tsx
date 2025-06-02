import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import api from "../api";
import { Product } from "./ProductList";


const ProductPage = () => {
    const { id } = useParams<{ id: string }>(); // uses the product id for URL
    const [ product, setProduct ] = useState<Product | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');

    useEffect(() => {
        api.get(`./products/${id}`)
            .then(response => setProduct(response.data))
            .catch(err => setError('Failed to fetch product details'))
            .finally(() => setLoading(false));
    }, [id]);
    
    if (loading) return <div>Loading prod details..</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} width='200' />
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
        </div>
    );
};

export default ProductPage;
