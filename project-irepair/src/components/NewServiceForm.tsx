import type {ServiceOrder} from "../App"
import { useState} from "react";
interface NewServiceFormProps{
    onAddService: (newService: ServiceOrder) => void;
}

function NewServiceForm ({onAddService}: NewServiceFormProps){
    const [cliente, setCliente] = useState("");
    const [modeloAparelho, setModeloAparelho] = useState("");
    const [defeito, setDefeito] = useState("");
    function handleSubmit(){
        const newService: ServiceOrder = {
            id: Date.now(),
            cliente: cliente,
            modeloAparelho: modeloAparelho,
            defeito: defeito,
            status: "aberto"
        };

        onAddService(newService);

        setCliente("");
        setModeloAparelho("");
        setDefeito("");
    }

    return(
        <div></div>
    );
}

export default NewServiceForm