export interface ServiceOrder {
  id: number;
  clientId: number;
  device: string;
  issue: string;
  status: 'open';
  created_at: string;
}

export interface ServiceOrderApi {
  id: number;
  client_id: number;
  device: string;
  issue: string;
  status: 'open';
  created_at: string;
}

// O que mandamos no corpo do POST (sem id e created_at, que sao gerados pelo servidor)
export type CreateServiceOrderData = Omit<ServiceOrder, 'id' | 'created_at' | 'status'>;
