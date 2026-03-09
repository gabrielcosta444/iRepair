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
    <body>
      <Header />
      <main>
        <NewServiceForm onAddService = {addService} />
        {services.map((service) => (
          <ServiceCard key = {service.id} service = {service}/>
        ))}
      </main>
    </body>
  )
}

export default App

