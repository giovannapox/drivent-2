import { prisma } from '@/config';

export async function ticketsByTypes(){
    return prisma.ticketType.findMany();
};

const paymentRepository = {
    ticketsByTypes,
};

export default paymentRepository;