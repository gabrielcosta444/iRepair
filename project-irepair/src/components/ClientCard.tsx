import type { Client } from "../types";

interface ClientCardProps{
    client: Client;
    onDeleteClient: (id: number) => void;
}

function ClientCard({client, onDeleteClient}: ClientCardProps){  
    return(
    <div className="bg-white rounded-xl shadow-md p-4 border border-slate-200 flex justify-between">
      <div>
        <h2 className="text-lg font-bold text-blue-700">{client.name}</h2>
        <h3 className="text-slate-600 mt-1">
        Telefone: {client.phone}
        </h3>
        <h3 className="text-slate-600 mt-1">
        Email: {client.email}
        </h3>
      </div>
      <div>
        <button
          onClick={() => onDeleteClient(client.id)}
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Excluir Cliente
        </button>
      </div>
    </div>
    );
}
export default ClientCard;