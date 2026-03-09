
import type {ServiceOrder} from "../App"

interface ServiceCardProps{
    service: ServiceOrder;
}

function ServiceCard({service}: ServiceCardProps){
    return(
        <div>
            <h2>{service.cliente}</h2>
            <h3>Aparelho: {service.modeloAparelho}</h3>
            <p>{service.defeito}</p>
        </div>
    );
}
export default ServiceCard;