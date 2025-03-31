import { CartItem, useCart } from "../contexts/CartContext"
import { useNavigate } from "react-router-dom";


const CartDisplay = () => {
    const { cart, removeFromCart, updateCartItem, clearCart, total } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (item: CartItem, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(item.id);
        } else {
            updateCartItem(item.id, newQuantity);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <p>
                                    Quantity:
                                    <input 
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value, 10))}
                                    />
                                </p>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}    
                    </ul>  
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button onClick={clearCart}>Clear Cart</button>  
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    )

}

export default CartDisplay;