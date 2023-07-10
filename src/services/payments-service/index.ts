import { notFoundError } from "@/errors";
import { Payment } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";

export async function getTicketsByType(){
    return await paymentRepository.ticketsByTypes();
};

export async function getTicketsUser(token: string){
    const tickets = await paymentRepository.getTickets(token);
    
    return tickets
};

export async function postNewTicket(token: string, ticketTypeId: number){
    if (!ticketTypeId){
        throw "error"
    }
    const ticket = await paymentRepository.createTicket(token, ticketTypeId);
    
    return ticket;
};

export async function postPayment(token: string, payment: Payment){
    return await paymentRepository.createPayment(payment);
};

export async function getPayments(token:string,ticketId:number) {
    if (!ticketId){
        throw "error"
    }
    const data = await paymentRepository.getPayments(token,ticketId);
    return data
}