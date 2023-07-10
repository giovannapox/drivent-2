import { notFoundError } from "@/errors";
import { Payment } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";

async function getTicketsByType(){
    return await paymentRepository.ticketsByTypes();
};

async function getTicketsUser(token: string){
    const tickets = await paymentRepository.getTickets(token);
    if(!tickets) throw notFoundError();
    return tickets
};

async function postNewTicket(token: string, ticketTypeId: number){
    if (!ticketTypeId){
        throw "error"
    }
    const ticket = await paymentRepository.createTicket(token, ticketTypeId);
    
    return ticket;
};

async function postPayment(token: string, payment: Payment){
    const ticketExists = await paymentRepository.ticketId(payment.ticketId);
    if(!ticketExists) {
        throw notFoundError();
    };

    return await paymentRepository.createPayment(payment);
};

async function getPayments(token:string,ticketId:number) {
    if (!ticketId){
        throw "error"
    }
    const data = await paymentRepository.getPayments(token,ticketId);
    return data
}

const ticketsService = {
    getTicketsByType,
    getTicketsUser,
    postNewTicket,
    postPayment,
    getPayments
};

export default ticketsService;