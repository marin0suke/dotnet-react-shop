// src/services/orders.ts
import api from './index';
import { OrderRaw } from '../types/Order';

export async function fetchAllOrders(): Promise<OrderRaw[]> {
  const response = await api.get<OrderRaw[]>('/order/all-orders');
  return response.data;
}