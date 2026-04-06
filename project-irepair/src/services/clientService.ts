import { api } from './api';
import type { Client, CreateClientData } from '../types';

type ApiResponse<T> = {
  data: T;
};

export async function getAllClients(): Promise<Client[]> {
  const response = await api.get<ApiResponse<Client[]>>('/clients');
  return response.data.data;
}

export async function createClient(data: CreateClientData): Promise<Client> {
  const response = await api.post<ApiResponse<Client>>('/clients', data);
  return response.data.data;
}

export async function getClient(id: number): Promise<Client> {
  const response = await api.get<ApiResponse<Client>>(`/clients/${id}`);
  return response.data.data;
}

export async function updateClient(
  id: number,
  data: CreateClientData
): Promise<Client> {
  const response = await api.put<ApiResponse<Client>>(`/clients/${id}`, data);
  return response.data.data;
}

export async function deleteClient(id: number): Promise<void> {
  await api.delete(`/clients/${id}`);
}