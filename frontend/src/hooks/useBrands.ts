import { useEffect, useState } from 'react';
import { BrandType } from '../utils/types/types';
import { api } from '../api/api';



export function useBrands() {
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBrands() {
            setLoading(true);
            setError(null);
            try {
                const data = await api.getBrands();
                setBrands(data);
            } catch (err: any) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        }

        fetchBrands();
    }, []);

    return { brands, loading, error };
}