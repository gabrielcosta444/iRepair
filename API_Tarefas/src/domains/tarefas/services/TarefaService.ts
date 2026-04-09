import { prisma } from "../../../config/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

interface ITarefa{
    client_id: number;
    device: string;
    issue: string;
}


class TarefaService{

    async createTask({device, issue, client_id}: ITarefa){

        if(!device || !issue || !client_id){
            throw new Error ('Campos faltantes.');
        }

        try{
            return await prisma.task.create({
                data: {
                    device: device,
                    issue: issue,
                    client_id: client_id
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

    async editTask(id: number, {device, issue, client_id}: ITarefa){
        try{
            return await prisma.task.update({ where: {id}, data: {
                device: device,
                issue: issue,
                client_id: client_id
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
