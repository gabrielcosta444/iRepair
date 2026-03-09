
import type {ServiceOrder} from "../App"

interface ServiceCardProps{
    service: ServiceOrder;
}

function ServiceCard({service}: ServiceCardProps){
    const statusColor = service.status == "aberto" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700";
    return(
    <div className="bg-white rounded-xl shadow-md p-4 border border-slate-200">
      <h2 className="text-lg font-bold text-blue-700">{service.cliente}</h2>
      <h3 className="text-slate-600 mt-1">
        Aparelho: {service.modeloAparelho}
      </h3>
      <p className="text-slate-600 mt-1">Defeito: {service.defeito}</p>

      <span
        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
      >
        {service.status}
      </span>
    </div>
    );
}
export default ServiceCard;