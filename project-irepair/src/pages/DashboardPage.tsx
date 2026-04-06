import { useEffect, useState } from 'react';
import { getAllClients } from '../services/clientService';
import { getAllServices } from '../services/serviceOrderService';

const DashboardPage = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [clients, services] = await Promise.all([
          getAllClients(),
          getAllServices(),
        ]);

        setTotalClients(clients.length);
        setTotalServices(services.length);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p className="text-slate-600">Carregando indicadores...</p>;
  }

  if (hasError) {
    return (
      <p className="text-red-600">
        Nao foi possivel carregar os dados do dashboard.
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Clientes cadastrados
          </p>
          <strong className="mt-4 block text-5xl font-bold text-blue-700">
            {totalClients}
          </strong>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Ordens de servico
          </p>
          <strong className="mt-4 block text-5xl font-bold text-blue-700">
            {totalServices}
          </strong>
        </article>
      </div>
    </section>
  );
};

export default DashboardPage;
