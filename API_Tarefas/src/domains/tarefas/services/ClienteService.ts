import { prisma } from "../../../config/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

interface ICliente{
    name: string;
    phone: string;
    email: string;
}


class ClienteService{

    async createClient({name, phone, email}: ICliente){

        if(!name || !phone || !email){
            throw new Error ('Campos faltantes.');
        }

        try{
            return await prisma.client.create({
                data: {
                    name: name,
                    phone: phone,
                    email: email
                }
            })
        } catch(error){
            throw error;
        }
        
    }

    async getClients(){
        try{
            return await prisma.client.findMany();
        }catch(error){
            throw error;
        }
    }

    async getClient(id: number){
        try{
            const client = await prisma.client.findUnique({ where: { id } });
            if(!client){
                throw new Error('Cliente não encontrado.');
            }
            return client;
        } catch (error){
            throw error;
        }
    }

    async editClient(id: number, {name, phone, email}: ICliente){
        try{
            return await prisma.client.update({ where: {id}, data: {
                name: name,
                phone: phone,
                email: email
            } })
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                throw new Error ('Cliente não encontrado.');
            }

            throw error;
        }
    }

    async removeClient(id: number){
        try{
            await prisma.client.delete({ where: {id} });
        } catch(error){
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                throw new Error ('Cliente não encontrado.');
            }

            throw error;
        }
    }

}
export {ClienteService};
