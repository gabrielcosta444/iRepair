export interface ServiceOrder {
  id: number;
  device: string;
  issue: string;
  status: string;
  created_at: string;
}

// O que mandamos no corpo do POST (sem id e created_at, que são gerados pelo servidor)
export type CreateServiceOrderData = Omit<ServiceOrder, 'id' | 'created_at'>;