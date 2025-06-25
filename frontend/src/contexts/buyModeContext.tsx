import React, { createContext, useContext, useState, ReactNode } from 'react';

type BuyMode = 'single' | 'cart';

interface BuyModeContextType {
    mode: BuyMode;
    setMode: (mode: BuyMode) => void;
}

const BuyModeContext = createContext<BuyModeContextType | undefined>(undefined);

export const BuyModeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<BuyMode>('single');

    return (
        <BuyModeContext.Provider value={{ mode, setMode }}>
            {children}
        </BuyModeContext.Provider>
    );
};

export const useBuyMode = () => {
    const context = useContext(BuyModeContext);
    if (!context) {
        throw new Error('useBuyMode must be used within a BuyModeProvider');
    }
    return context;
};