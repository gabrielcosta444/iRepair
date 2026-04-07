import express from 'express';
import { tarefasRoutes } from '../routes/tarefa.routes';
import { authRoutes } from '../auth/auth.routes';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',  // origem exata do seu front-end
    credentials: true,  
}))


app.use('/tasks', tarefasRoutes);
app.use('/auth', authRoutes)

export {app};