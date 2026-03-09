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
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Nova Ordem de Serviço
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nome do cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Modelo do aparelho"
          value={modeloAparelho}
          onChange={(e) => setModeloAparelho(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Defeito"
          value={defeito}
          onChange={(e) => setDefeito(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Salvar
        </button>
      </div>
    </div>
    );
}

export default NewServiceForm