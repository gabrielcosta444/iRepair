import { useEffect, useState } from 'react';
import { getAllServices, createService, deleteService } from '../services/serviceOrderService';
import { getAllClients } from '../services/clientService';
import type { CreateServiceOrderData, ServiceOrder } from '../types';
import type { Client } from '../types';
import NewServiceForm from '../components/NewServiceForm';
import ServiceCard from '../components/ServiceCard';

const ServiceOrdersPage = () => {
  const [services, setServices] = useState<ServiceOrder[]> ([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const servicesData = await getAllServices();
        const clientsData = await getAllClients();
        setServices(servicesData);
        setClients(clientsData);
      } catch (error) {
        console.error('Erro ao carregar serviços:', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  

  function getClientName(clientId: number){
    const client = clients.find(c => c.id === clientId)
    return client ? client.name: 'Cliente não encontrado';
  }

  async function handleDeleteService(id: number) {
    try {
      await deleteService(id);
      setServices(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
    }
  }

  async function handleCreateService(dataService: CreateServiceOrderData) {
    try {
      console.log('payload enviado:', dataService);
      const newService = await createService(dataService);
      setServices(prev => [...prev, newService]);
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
    }
  }

  if (loading) {
    return <p>Carregando serviços...</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center py-6">
        <NewServiceForm onCreateService={handleCreateService} />
      </div>

      <div className='flex flex-col gap-4'>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onDeleteService={handleDeleteService}
            clientName = {getClientName(service.clientId)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceOrdersPage;