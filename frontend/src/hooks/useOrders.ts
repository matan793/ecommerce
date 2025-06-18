import { useEffect, useState } from "react";
import { OrderType } from "../utils/types/types";
import { apiClient } from "../api/api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<OrderType[]>("/orders/all");
      setOrders(response.data);
    } catch (err: any) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, fetchOrders };
};