import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserType } from '../utils/types/types';
import { apiClient } from '../api/api';



interface UserContextType {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    logout: () => void;
    fetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const logout = () => setUser(null);
    const fetchUser = async () => {
   

        try {
            const res = await apiClient.get<UserType>('/auth/user')

            if (res.status === 200) {
                setUser(res.data as UserType);
                // setLoading(false);
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
            console.log('Error fetching user:', err);

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, logout, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};