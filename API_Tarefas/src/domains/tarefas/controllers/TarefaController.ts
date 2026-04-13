import { Request, Response } from 'express';
import { TarefaService } from '../services/TarefaService'; 

class TarefaController {
  
  async createTask(req: Request, res: Response) {
    try {
      const { client_id, device, issue } = req.body;
      
      const service = new TarefaService();
      const tarefa = await service.createTask({ client_id, device, issue });
      
      return res.status(201).json(tarefa);
      
    } catch (error) {
      return res.status(400).json({ erro: (error as Error).message });
    }
  }

  async getTasks(req: Request, res: Response) {
    const service = new TarefaService();
    const tarefas = await service.getTasks();
    return res.status(200).json(tarefas);
  }

  async getTask(req: Request, res: Response){
    try{
        const id = Number(req.params.id);
        const service = new TarefaService();
        const tarefa = await service.getTask(id);
        return res.status(200).json(tarefa);
    } catch (error){
        return res.status(404).json({ erro: (error as Error).message });
    }
  }

  async editTask(req: Request, res: Response){
    try{
        const id = Number(req.params.id);
        const { client_id, device, issue } = req.body;
        const service = new TarefaService();
        const tarefa = await service.editTask(id, { client_id, device, issue });
        return res.status(200).json(tarefa);
    } catch (error){
        return res.status(404).json({ erro: (error as Error).message });
    }
  }

  async removeTask(req: Request, res: Response){
      try {
        const id = Number(req.params.id);
        const service = new TarefaService();
        await service.removeTask(id);
        return res.status(204).send();
      } catch (error) {
        return res.status(404).json({ erro: (error as Error).message });
      }
  }
}

export { TarefaController };
