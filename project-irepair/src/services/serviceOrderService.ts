import { api } from './api';
import type { ServiceOrder, CreateServiceOrderData } from '../types';


export async function getAllServices(): Promise<ServiceOrder[]> {
  const response = await api.get<ServiceOrder[]>('/tasks');
  return response.data;
}

export async function createService(data: CreateServiceOrderData): Promise<ServiceOrder> {
  const response = await api.post<ServiceOrder>('/tasks', data);
  return response.data;
}

export async function getService(id: number): Promise<ServiceOrder> {
  const response = await api.get<ServiceOrder>(`/tasks/${id}`);
  return response.data;
}

export async function updateService(id: number, data: CreateServiceOrderData): Promise<ServiceOrder> {
  const response = await api.put<ServiceOrder>(`/tasks/${id}`, data);
  return response.data;
}

export async function deleteService(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
