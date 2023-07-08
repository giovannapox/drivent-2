import { prisma } from '@/config';
import { notFoundError } from '@/errors';

export async function ticketsByTypes(){
    return prisma.ticketType.findMany();
};

export async function getTickets(token: string){
    const user = await prisma.session.findFirst({
        where: {
            token: token
        }
    });
    if(!user){
        throw notFoundError();
    }
    return prisma.ticket.findFirst({
        where: {
            id: user.userId
        }
    });
};

const paymentRepository = {
    ticketsByTypes,
    getTickets
};

export default paymentRepository;