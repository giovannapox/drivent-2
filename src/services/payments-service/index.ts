import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";

export async function getTicketsByType(){
    return await paymentRepository.ticketsByTypes();
}

export async function getTicketsUser(token: string){
    const tickets = await paymentRepository.getTickets(token);
    if(!tickets){
        throw notFoundError();
    }
    return 
}