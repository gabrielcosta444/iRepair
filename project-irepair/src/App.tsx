import { useState } from 'react';
import Header from './components/Header';
import NewServiceForm from './components/NewServiceForm'; 
import ServiceCard from './components/ServiceCard';

export interface ServiceOrder{
  id: number;
  cliente: string;
  modeloAparelho: string;
  defeito: string;
  status: "aberto" | "finalizado";
}

function App() {
  const [services, setServices] = useState <ServiceOrder[]> ([]);

  function addService(newService: ServiceOrder){
    setServices ([... services, newService]);
  }

  function finalizeService(id: number){
    setServices((prevServices) =>
    prevServices.map((service) =>
      service.id === id
        ? { ...service, status: "finalizado" }
        : service
    )
    );
  } 

  return (
      <div>
          <Header />
      <main className="flex flex-col gap-3">
        <div className='flex justify-center py-6'>
          <NewServiceForm onAddService = {addService} />
        </div>
        <div className='px-5'>
          {services.map((service) => (
          <ServiceCard key = {service.id} service = {service} onFinalize = {finalizeService}/>
        ))}
        </div>
      </main>
      </div>
  )
}

export default App

