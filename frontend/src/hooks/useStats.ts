import { useState, useEffect } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";

export interface StatsType {
    toalOrders: number;
    totalRevenue: number;
    monthOrders: number;
    monthRevenue: number;
}

export const useStats = () => {

    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [stats, setStats] = useState<StatsType>({
        toalOrders: 0,
        totalRevenue: 0,
        monthOrders: 0,
        monthRevenue: 0,
    });
    const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
    const fetchStats = async () => {
        try {
            const [ totalRevenue, monthOrders, monthRevenue] = await Promise.all([
                api.getRevenue(),
                api.countOrdersInMonth(selectedYear, selectedMonth+1),
                api.revenueInMonth(selectedYear, selectedMonth+1)
            ]);

            setStats({
                toalOrders: 0,
                totalRevenue,
                monthOrders,
                monthRevenue,
            });
        } catch (error) {
            toast.error('Error fetching stats');
        } finally {
            setLoading(false);
        }
    };

    fetchStats();
}, [selectedMonth, selectedYear]);

    return { stats, setStats, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, loading }
}