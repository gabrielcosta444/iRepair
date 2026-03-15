import type { CreateClientData } from "../types";
import { useState} from "react";

interface NewClientFormProps{
    onCreateClient: (dataClient: CreateClientData) => void;
}

function NewClientForm ({onCreateClient}: NewClientFormProps){
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    function handleSubmit(){
        const dataClient: CreateClientData = {
            name: name,
            phone: phone,
            email: email,
        };

        onCreateClient(dataClient);

        setName("");
        setPhone("");
        setEmail("");
    }

    return(
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Cadastrar Novo Cliente
      </h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default NewClientForm;