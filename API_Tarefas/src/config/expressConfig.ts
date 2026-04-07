import express from 'express';
import { tarefasRoutes } from '../routes/tarefa.routes';
import { authRoutes } from '../auth/auth.routes';

const app = express();
app.use(express.json()); 
app.use('/tasks', tarefasRoutes);
app.use('/auth', authRoutes)

export {app};