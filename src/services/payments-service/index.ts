import { notFoundError } from "@/errors";
import { Payment } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";

export async function getTicketsByType(){
    return await paymentRepository.ticketsByTypes();
};

export async function getTicketsUser(token: string, userId: number){
    const enrollment = await enrollmentRepository.findUserEnrollment(userId)
    if(!enrollment) {
        throw notFoundError();
    }

    const tickets = await paymentRepository.getTickets(token);
    if(!tickets){
        throw notFoundError();
    }
    
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
    const tickets = await paymentRepository.getTickets(token);
    if(!tickets){
        throw notFoundError();
    };
    return await paymentRepository.createPayment(payment);
};

export async function getPayments(token:string,ticketId:number) {
    if (!ticketId){
        throw "error"
    }
    const data = await paymentRepository.getPayments(token,ticketId);
    return data
}