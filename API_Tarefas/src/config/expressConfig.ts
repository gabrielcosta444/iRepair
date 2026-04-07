import express from 'express';
import { tarefasRoutes } from '../routes/tarefa.routes';
import { authRoutes } from '../auth/auth.routes';
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.json());
app.use(cookieParser());
 
app.use('/tasks', tarefasRoutes);
app.use('/auth', authRoutes)

export {app};