import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../api/axios';
import type { AuthContextType, User } from '@/types';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    // Token bor bo'lsa, user ma'lumotini tiklash (lekin hozircha oddiy saqlaymiz)
    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } catch (err) {
                    console.warn('Token invalid yoki eskirgan', err);
                    logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            const { access_token, user } = res.data;
            localStorage.setItem('token', access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            setToken(access_token);
            setUser(user); // real user ma'lumoti
            return user;
        } catch (err: any) {
            throw err;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            const res = await api.post('/auth/register', { email, password });
            const { access_token, user } = res.data;
            localStorage.setItem('token', access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            setToken(access_token);
            setUser(user);
            return user;
        } catch (err: any) {
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};