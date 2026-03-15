import { useEffect, useState } from 'react';
import { getAllClients, deleteClient, createClient } from '../services/clientService';
import type { Client, CreateClientData } from '../types';
import NewClientForm from '../components/NewClientForm';
import ClientCard from '../components/ClientCard';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllClients();
        setClients(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleDeleteClient(id: number) {
    try {
      await deleteClient(id);
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  }

  async function handleCreateClient(dataClient: CreateClientData) {
    try {
      const newClient = await createClient(dataClient);
      setClients(prev => [...prev, newClient]);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  }

  if (loading) {
    return <p>Carregando clientes...</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center py-6">
        <NewClientForm onCreateClient={handleCreateClient} />
      </div>

      <div className='flex flex-col gap-4'>
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onDeleteClient={handleDeleteClient}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientsPage;