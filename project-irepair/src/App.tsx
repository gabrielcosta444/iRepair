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
  return (
      <div>
          <Header />
      <main className="flex flex-col gap-3">
        <div className='flex justify-center py-6'>
          <NewServiceForm onAddService = {addService} />
        </div>
          {services.map((service) => (
          <ServiceCard key = {service.id} service = {service}/>
        ))}
      </main>
      </div>
  )
}

export default App

