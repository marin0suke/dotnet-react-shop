import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthUser } from '../types/AuthUser.ts';
import api from '../api';


export interface AuthContextType { // defines type interface for the context (what is included in the component)
    user: AuthUser | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<AuthUser>; //
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // catch errors early if components outside of the provider try to access the context. ensure proper use of contxt.

interface AuthProviderProps {
    children: ReactNode; // like a catch all. any valid react components can be passed in and rendered correctly. 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { // rehydrate user on initial load
        const loadUser = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.get("/auth/me", {
                    headers: {Authorization: `Bearer ${token}`}
                });
                const authUser: AuthUser = { ...response.data, token };
                setUser(authUser);
            } catch (error) {
                console.error("Error loading user:", error);
                localStorage.removeItem("token"); // optional clear invalid token
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, [])

    const login = async (email: string, password: string): Promise<AuthUser> => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const authUser: AuthUser = response.data;
            setUser(authUser);
            localStorage.setItem("token", authUser.token); // persist auth token
            return authUser;
        } catch (error) {
            console.log("Error during login", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    const register = async (userName: string, email: string, password: string) => {
        try {
            const response = await api.post('/auth/register', { userName, email, password });
            const authUser: AuthUser = response.data;
            setUser(authUser);
            localStorage.setItem("token", authUser.token);
        } catch (error) {
            console.error("Error during registration:", error);
            throw error;
        }
    };

    const value: AuthContextType = { // ensure shape of data matches expected type. the state, and functions. 
        user, 
        isLoading,
        login, 
        logout,
        register,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => { // custom hook. convenient wrapper around 
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    } 
    return context;
};