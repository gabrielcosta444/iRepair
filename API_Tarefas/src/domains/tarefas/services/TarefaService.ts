import { prisma } from "../../../config/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

interface ITarefa{
    title: string;
    description: string;
}


class TarefaService{

    async createTask({title, description}: ITarefa){

        if(!title){
            throw new Error ('Título da tarefa é obrigatório.');
        }

        try{
            return await prisma.task.create({
                data: {
                    title: title,
                    description: description
                }
            })
        } catch(error){
            throw error;
        }
        
    }

    async getTasks(){
        try{
            return await prisma.task.findMany();
        }catch(error){
            throw error;
        }
    }

    async getTask(id: number){
        try{
            const task = await prisma.task.findUnique({ where: { id } });
            if(!task){
                throw new Error('Tarefa não encontrada.');
            }
            return task;
        } catch (error){
            throw error;
        }
    }

    async editTask(id: number, {title, description}: ITarefa){
        try{
            return await prisma.task.update({ where: {id}, data: {
                title: title,
                description: description
            } })
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                throw new Error ('Tarefa não encontrada.');
            }

            throw error;
        }
    }

    async removeTask(id: number){
        try{
            await prisma.task.delete({ where: {id} });
        } catch(error){
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                throw new Error ('Tarefa não encontrada.');
            }

            throw error;
        }
    }

}
export {TarefaService};
