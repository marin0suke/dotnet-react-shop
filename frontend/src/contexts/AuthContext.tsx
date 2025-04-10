import { createContext, ReactNode, useContext, useState } from 'react';
import { AuthUser } from '../types/AuthUser.ts';
import api from '../api';


export interface AuthContextType { // defines type interface for the context (what is included in the component)
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<void>; //
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // catch errors early if components outside of the provider try to access the context. ensure proper use of contxt.

interface AuthProviderProps {
    children: ReactNode; // like a catch all. any valid react components can be passed in and rendered correctly. 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const authUser: AuthUser = response.data;
            setUser(authUser);
            localStorage.setItem("token", authUser.token); // persist auth token
        } catch (error) {
            console.log("Error during login", error);
            //optionally handle error state or dispolay message
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const authUser: AuthUser = response.data;
            setUser(authUser);
            localStorage.setItem("token", authUser.token);
        } catch (error) {
            console.error("Error during registration:", error);
            // rego error handling to add
        }
    };

    const value: AuthContextType = { // ensure shape of data matches expected type. the state, and functions. 
        user, 
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