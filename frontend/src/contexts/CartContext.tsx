import { createContext, ReactNode, useContext, useMemo, useState, useEffect } from "react";
import { Product } from "../types/Product";
import { useAuth } from "./AuthContext";
import api from "../api";

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateCartItem: (productId: number, quantity: number) => void;
    clearCart: () => void;
    total: number;
    isLoading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    // Load cart from appropriate source based on auth state
    useEffect(() => {
        const loadCart = async () => {
            setIsLoading(true);
            try {
                if (user) {
                    // Load cart from backend for authenticated users
                    const response = await api.get('/cart');
                    setCart(response.data);
                } else {
                    // Load cart from localStorage for guests
                    const storedCart = localStorage.getItem("cart");
                    if (storedCart) {
                        setCart(JSON.parse(storedCart));
                    }
                }
            } catch (error) {
                console.error("Error loading cart:", error);
                // Fallback to localStorage if backend fails
                const storedCart = localStorage.getItem("cart");
                if (storedCart) {
                    setCart(JSON.parse(storedCart));
                }
            } finally {
                setIsLoaded(true);
                setIsLoading(false);
            }
        };

        loadCart(); 
    }, [user]);

    // Save cart to appropriate destination based on auth state
    useEffect(() => {
        const saveCart = async () => {
            if (!isLoaded) return;

            try {
                if (user) {
                    // Save cart to backend for authenticated users
                    await api.post('/cart', cart);
                } else {
                    // Save cart to localStorage for guests
                    localStorage.setItem("cart", JSON.stringify(cart));
                }
            } catch (error) {
                console.error("Error saving cart:", error);
                // Fallback to localStorage if backend fails
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        };

        saveCart();
    }, [cart, isLoaded, user]);

    const addToCart = async (product: Product, quantity: number = 1) => {
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

    const value: CartContextType = {
        cart, 
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        total,
        isLoading
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

