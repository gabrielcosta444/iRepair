import { Router } from "express";
import { ClienteController } from "../domains/tarefas/controllers/ClienteController";

const clientesRoutes = Router();
const controller = new ClienteController;

clientesRoutes.post('/', controller.createClient);

clientesRoutes.get('/', controller.getClients);
clientesRoutes.get('/:id', controller.getClient);

clientesRoutes.put('/:id', controller.editClient);

clientesRoutes.delete('/:id', controller.removeClient);


export {clientesRoutes};
