import paymentRepository from "@/repositories/payment-repository";

export async function getTicketsByType(){
    return await paymentRepository.ticketsByTypes();
}