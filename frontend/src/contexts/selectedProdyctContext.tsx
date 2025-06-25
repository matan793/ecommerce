import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductType } from '../utils/types/types';



type SelectedProductContextType = {
    selectedProduct: ProductType | null;
    setSelectedProduct: (product: ProductType | null) => void;
};

const SelectedProductContext = createContext<SelectedProductContextType | undefined>(undefined);

export const SelectedProductProvider = ({ children }: { children: ReactNode }) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

    return (
        <SelectedProductContext.Provider value={{ selectedProduct, setSelectedProduct }}>
            {children}
        </SelectedProductContext.Provider>
    );
};

export const useSelectedProduct = () => {
    const context = useContext(SelectedProductContext);
    if (!context) {
        throw new Error('useSelectedProduct must be used within a SelectedProductProvider');
    }
    return context;
};