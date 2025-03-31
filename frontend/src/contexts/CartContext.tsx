import { createContext, ReactNode, useContext, useMemo, useState, useEffect } from "react";
import { Product } from "../types/Product";


export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType { // define shape of our cart context.
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateCartItem: (productId: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined); // create a context with an init empty state.

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => { // provider component.
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false); // indicate cart load. to avoid effect clash.

    useEffect(() => {
        const storedCart = localStorage.getItem("cart"); // 
        console.log("Loading cart from localStorage:", storedCart);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
        setIsLoaded(true);
    }, []); // runs once on Provider mount. this must run first before saving items to localStorage.

    useEffect(() => {
        console.log("Saving cart to localStorage:", cart);
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isLoaded]); // writes cart to state each time it changes.

    const addToCart = (product: Product, quantity: number = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => 
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    //func to remove product from the cart by its id.
    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const updateCartItem = (productId: number, quantity: number) => {
        setCart((prevCart) => 
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cart]);


    const value: CartContextType = { // value provided to any component that subscribes to this context.
        cart, 
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        total,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

