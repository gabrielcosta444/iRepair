import express from 'express';
import { tarefasRoutes } from '../routes/tarefa.routes';

const app = express();
app.use(express.json()); 
app.use('/tasks', tarefasRoutes);

export {app};