import { loadStripe } from "@stripe/stripe-js";
import api from "../api";


const stripePromise = loadStripe("pk_test_51Qzx0y4FUUZQl3Q105adwse5CW5MmyZX023cLJ203htPDHTluABa0HORj4jidJAaTUNltphiv3jFXEUyxyVUVdJU00nVJJ2mNE"); 
//init outside of component so it only happens once. 

interface CheckoutButtonProps {
    productName: string;
    amount: number; // amount in numbers
};

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ productName, amount }) => {
    const handleCheckout = async () => {
        try {
            // call backend to create a sessionId
            const response = await api.post("/payment/create-checkout-session", { productName, amount });
            const sessionId = response.data.sessionId;

            const stripe = await stripePromise;
            if (stripe) {
                const { error } = await stripe.redirectToCheckout({ sessionId });
                if (error) {
                    console.error("Stripe redirect error: ", error )
                }
            } 

        } catch (error) {
            console.log("Checkout session error: ", error);
        }
    };

    return <button onClick={handleCheckout}>Pay Now</button>
}

export default CheckoutButton;
