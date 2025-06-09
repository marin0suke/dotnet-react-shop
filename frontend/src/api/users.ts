import api from './index';
import { UserSummaryRaw } from '../types/User';

export async function fetchAllRetailers(): Promise<UserSummaryRaw[]> {
  const response = await api.get<UserSummaryRaw[]>('/user/retailers');
  return response.data;
}