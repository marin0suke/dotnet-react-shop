
import { useState } from "react";
import { useCart } from "../contexts/CartContext";



const CheckoutPage = () => {
    const { cart, total, clearCart } = useCart();

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const [orderSubmitted, setOrderSubmitted] = useState(false); 

    // handle changes to the shipping form inputs:
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value, // computed property name - so can use a single generic change handler that works for any input field. 
        });
    };

    const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // send order details to backend.
        console.log("order submitted: ", { cart, shippingInfo, total });
        clearCart();
        setOrderSubmitted(true);
    }

    if (orderSubmitted) {
        return <div>Thank you for your order</div>;
    }

    return (
        <div>
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <h3>Your Order:</h3>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id}>
                                {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <form onSubmit={handleSubmitOrder}>
                        <h3>Shipping information</h3>
                        <input 
                            name="firstName"
                            placeholder="First Name"
                            value={shippingInfo.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            name="lastName"
                            placeholder="Last Name"
                            value={shippingInfo.lastName}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            name="address"
                            placeholder="Address"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            name="city"
                            placeholder="City"
                            value={shippingInfo.city}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            name="postalCode"
                            placeholder="Postal Code"
                            value={shippingInfo.postalCode}
                            onChange={handleInputChange}
                            required
                        />
                        <input 
                            name="country"
                            placeholder="Country"
                            value={shippingInfo.country}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">Submit Order</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;