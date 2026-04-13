import { Request, Response } from 'express';
import { ClienteService } from '../services/ClienteService'; 

class ClienteController {
  
  async createClient(req: Request, res: Response) {
    try {
      const { name, phone, email } = req.body;
      
      const service = new ClienteService();
      const cliente = await service.createClient({ name, phone, email });
      
      return res.status(201).json(cliente);
      
    } catch (error) {
      return res.status(400).json({ erro: (error as Error).message });
    }
  }

  async getClients(req: Request, res: Response) {
    const service = new ClienteService();
    const clientes = await service.getClients();
    return res.status(200).json(clientes);
  }

  async getClient(req: Request, res: Response){
    try{
        const id = Number(req.params.id);
        const service = new ClienteService();
        const cliente = await service.getClient(id);
        return res.status(200).json(cliente);
    } catch (error){
        return res.status(404).json({ erro: (error as Error).message });
    }
  }

  async editClient(req: Request, res: Response){
    try{
        const id = Number(req.params.id);
        const { name, phone, email } = req.body;
        const service = new ClienteService();
        const cliente = await service.editClient(id, { name, phone, email });
        return res.status(200).json(cliente);
    } catch (error){
        return res.status(404).json({ erro: (error as Error).message });
    }
  }

  async removeClient(req: Request, res: Response){
      try {
        const id = Number(req.params.id);
        const service = new ClienteService();
        await service.removeClient(id);
        return res.status(204).send();
      } catch (error) {
        return res.status(404).json({ erro: (error as Error).message });
      }
  }
}

export { ClienteController };
