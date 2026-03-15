
import type {ServiceOrder} from "../types"

interface ServiceCardProps{
    service: ServiceOrder;
    onDeleteService: (id: number) => void;
    clientName: string;
}

function ServiceCard({service, onDeleteService, clientName}: ServiceCardProps){
    return(
    <div className="bg-white rounded-xl shadow-md p-4 border border-slate-200 flex justify-between">
      <div>
        <h2 className="text-lg font-bold text-blue-700">{clientName}</h2>
        <h3 className="text-slate-600 mt-1">
        Aparelho: {service.device}
        </h3>
        <h3 className="text-slate-600 mt-1">
        Defeito: <p>{service.issue}</p>
        </h3>
        <h3 className="text-slate-600 mt-1">
        Status: {service.status}
        </h3>
      </div>
      <div>
        <button
          onClick={() => onDeleteService(service.id)}
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Finalizar
        </button>
      </div>
    </div>
    );
}
export default ServiceCard;
