import { useEffect, useState } from "react";
import { api } from "../api/api";
import { MonthlyOrderStats } from "../utils/types/types";

export const useGetMonthlyData = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState<MonthlyOrderStats[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.getMonthlyOrderStats(year); // returns MonthlyOrderStats[]
                console.log(res);

                const fullData = Array.from({ length: 12 }, (_, i) => {
                    const monthIndex = i + 1;
                    // Find item where the month part (after '-') matches monthIndex
                    const monthData = res.find(d => {
                        const monthNum = Number(d.month.split('-')[1]);
                        return monthNum === monthIndex;
                    });
                    return {
                        month: monthIndex,
                        orderCount: monthData ? monthData.orderCount : 0,
                    };
                });

                setData(fullData);
                console.log(fullData);

            } catch {
                setError("Failed to load monthly stats");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [year]);

    return { year, setYear, data, loading, error };
};
