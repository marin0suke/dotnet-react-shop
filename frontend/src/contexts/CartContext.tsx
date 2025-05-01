import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../api';
import { CartItem } from '../types/CartItem';
import { Snackbar, Alert } from '@mui/material';

interface CartContextType {
    cart: CartItem[];
    addToCart: (productId: number, quantity: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    clearCart: () => void;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<{ message: string; open: boolean }>({ message: '', open: false });
    const { user } = useAuth();
    const isAuthenticated = !!user;

    const showNotification = (message: string) => {
        setNotification({ message, open: true });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    // Load cart when auth state changes
    useEffect(() => {
        const loadCart = async () => {
            setIsLoading(true);
            try {
                if (isAuthenticated && user) {
                    // Load authenticated cart from server
                    const response = await api.get('/cart');
                    const serverCart = response.data;
                    
                    // Get guest cart from localStorage
                    const guestCartJson = localStorage.getItem('guestCart');
                    const guestCart = guestCartJson ? JSON.parse(guestCartJson) : [];
                    
                    if (guestCart.length > 0) {
                        // Merge guest cart with server cart
                        for (const guestItem of guestCart) {
                            try {
                                await api.post('/cart', {
                                    productId: guestItem.productId,
                                    quantity: guestItem.quantity
                                });
                            } catch (error) {
                                console.error('Error merging cart item:', error);
                            }
                        }
                        // Clear guest cart after successful merge
                        localStorage.removeItem('guestCart');
                        // Reload the merged cart
                        const updatedResponse = await api.get('/cart');
                        setCart(updatedResponse.data);
                    } else {
                        setCart(serverCart);
                    }
                } else {
                    // Load guest cart from localStorage
                    const guestCartJson = localStorage.getItem('guestCart');
                    setCart(guestCartJson ? JSON.parse(guestCartJson) : []);
                }
            } catch (error) {
                console.error('Error loading cart:', error);
                setCart([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadCart();
    }, [isAuthenticated, user]);

    const addToCart = async (productId: number, quantity: number) => {
        if (isAuthenticated) {
            try {
                // Add item to cart
                await api.post('/cart', { productId, quantity });
                // Reload entire cart to ensure consistency
                const response = await api.get('/cart');
                const addedItem = response.data.find((item: CartItem) => item.productId === productId);
                setCart(response.data);
                showNotification(`${addedItem.productName} added to cart`);
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        } else {
            // For guest cart, we need to fetch the product details first
            try {
                const productResponse = await api.get(`/products/${productId}`);
                const product = productResponse.data;
                
                const newCart = [...cart];
                const existingItem = newCart.find(item => item.productId === productId);
                
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    newCart.push({
                        id: Date.now(), // Temporary ID for guest cart items
                        productId: product.id,
                        productName: product.name,
                        productPrice: product.price,
                        quantity: quantity,
                        imageUrl: product.imageUrl
                    });
                }
                
                setCart(newCart);
                localStorage.setItem('guestCart', JSON.stringify(newCart));
                showNotification(`${product.name} added to cart`);
            } catch (error) {
                console.error('Error adding to guest cart:', error);
            }
        }
    };

    const removeFromCart = async (productId: number) => {
        if (isAuthenticated) {
            try {
                await api.delete(`/cart/${productId}`);
                // Reload entire cart to ensure consistency
                const response = await api.get('/cart');
                setCart(response.data);
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        } else {
            const newCart = cart.filter(item => item.productId !== productId);
            setCart(newCart);
            localStorage.setItem('guestCart', JSON.stringify(newCart));
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        if (isAuthenticated) {
            try {
                await api.put(`/cart/${productId}`, { quantity });
                // Reload entire cart to ensure consistency
                const response = await api.get('/cart');
                setCart(response.data);
            } catch (error) {
                console.error('Error updating cart:', error);
            }
        } else {
            const newCart = cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity }
                    : item
            );
            setCart(newCart);
            localStorage.setItem('guestCart', JSON.stringify(newCart));
        }
    };

    const clearCart = () => {
        if (isAuthenticated) {
            api.delete('/cart').catch(error => {
                console.error('Error clearing cart:', error);
            });
        }
        setCart([]);
        localStorage.removeItem('guestCart');
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            isLoading
        }}>
            {children}
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

