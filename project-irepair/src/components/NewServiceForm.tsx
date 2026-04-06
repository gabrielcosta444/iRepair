import type {CreateServiceOrderData} from "../types"
import { getAllClients } from "../services/clientService";
import { useState} from "react";
interface NewServiceFormProps{
    onCreateService: (dataService: CreateServiceOrderData) => void;
}

function NewServiceForm ({onCreateService}: NewServiceFormProps){
    const [clientId, setClientId] = useState<number | null> (null);
    const [device, setDevice] = useState("");
    const [issue, setIssue] = useState("");
    const [clientName, setClientName] = useState ("");

    async function handleVerfifyClient(clientName: string) {
      const data = await getAllClients();
      const client = data.find(c => c.name === clientName);
      if(client){
        setClientId(client.id);
        return client.id;
      }else{
        setClientId(null);
        return null;
      }
    }

    function handleSubmit(){
        if(!clientId){
          alert("Cliente não encontrado");
          return;
        }
        const dataService: CreateServiceOrderData = {
            clientId: clientId,
            device: device,
            issue: issue
        };

        onCreateService(dataService);

        setClientId(null);
        setClientName ("");
        setDevice("");
        setIssue("");
    }


    return(
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Nova Ordem de Serviço
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nome completo do cliente"
          value={clientName}
          onChange={(e) => {
            const name = e.target.value;
            setClientName (name);
            handleVerfifyClient(name);
          }}
          className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Modelo do aparelho"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Defeito"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
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
