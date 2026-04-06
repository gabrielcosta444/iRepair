import { Router } from "express";
import { TarefaController } from "../domains/tarefas/controllers/TarefaController";

const tarefasRoutes = Router();
const controller = new TarefaController;

tarefasRoutes.post('/', controller.createTask);

tarefasRoutes.get('/', controller.getTasks);
tarefasRoutes.get('/:id', controller.getTask);

tarefasRoutes.put('/:id', controller.editTask);

tarefasRoutes.delete('/:id', controller.removeTask);


export {tarefasRoutes};
