import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserType } from '../utils/types/types';
import { apiClient } from '../api/api';



interface UserContextType {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);

    const logout = () => setUser(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await apiClient.get('/auth/user')
                console.log('res', res);
                if (res.status === 200) {  
                    setUser(res.data as UserType);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
                console.log('Error fetching user:', err);
                
            } finally {
                //setLoading(false);
            }
        };

        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};