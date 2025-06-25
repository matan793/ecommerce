import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalOpenContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const ModalOpenContext = createContext<ModalOpenContextType | undefined>(undefined);

export const useModalOpen = () => {
    const context = useContext(ModalOpenContext);
    if (!context) {
        throw new Error('useModalOpen must be used within a ModalOpenProvider');
    }
    return context;
};

type ModalOpenProviderProps = {
    children: ReactNode;
};

export const ModalOpenProvider: React.FC<ModalOpenProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <ModalOpenContext.Provider value={{ open, setOpen }}>
            {children}
        </ModalOpenContext.Provider>
    );
};