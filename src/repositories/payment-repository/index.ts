import { prisma } from '@/config';
import { notFoundError } from '@/errors';

export async function ticketsByTypes() {
    return prisma.ticketType.findMany();
};

export async function getTickets(token: string) {
    const user = await prisma.session.findFirst({
        where: {
            token: token
        }
    });
    if (!user) {
        throw notFoundError();
    }
    return prisma.ticket.findFirst({
        where: {
            id: user.userId
        }
    });
};

export async function createTicket(token: string, ticketTypeId: number) {
    const user = await prisma.session.findFirst({
        where: {
            token: token
        }
    });

    const enrollment = await prisma.enrollment.findFirst({
        where: {
            userId: user.userId
        }
    });

    await prisma.ticket.create({
        data: {
            status: "RESERVED",
            ticketTypeId,
            enrollmentId: enrollment.id,
        }
    });
    return
}

const paymentRepository = {
    ticketsByTypes,
    getTickets,
    createTicket
};

export default paymentRepository;