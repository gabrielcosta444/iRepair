import { api } from './api';
import type { ServiceOrder, ServiceOrderApi, CreateServiceOrderData } from '../types';

type ApiResponse<T> = {
  data: T;
};

function mapServiceOrder(service: ServiceOrderApi): ServiceOrder {
  return {
    id: service.id,
    clientId: service.client_id,
    device: service.device,
    issue: service.issue,
    status: service.status,
    created_at: service.created_at,
  };
}

export async function getAllServices(): Promise<ServiceOrder[]> {
  const response = await api.get<ApiResponse<ServiceOrderApi[]>>('/service-orders');
  return response.data.data.map(mapServiceOrder);
}

export async function createService(data: CreateServiceOrderData): Promise<ServiceOrder> {
  const response = await api.post<ApiResponse<ServiceOrderApi>>('/service-orders', data);
  return mapServiceOrder(response.data.data);
}

export async function getService(id: number): Promise<ServiceOrder> {
  const response = await api.get<ApiResponse<ServiceOrderApi>>(`/service-orders/${id}`);
  return mapServiceOrder(response.data.data);
}

export async function updateService(id: number, data: CreateServiceOrderData): Promise<ServiceOrder> {
  const response = await api.put<ApiResponse<ServiceOrderApi>>(`/service-orders/${id}`, data);
  return mapServiceOrder(response.data.data);
}

export async function deleteService(id: number): Promise<void> {
  await api.delete(`/service-orders/${id}`);
}
