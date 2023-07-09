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
    
    if(!user){
        throw notFoundError();
    }

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

    const ticketType = await prisma.ticketType.findFirst({
        where:{
          id:ticketTypeId
        }
    });

    const ticket = await prisma.ticket.findFirst({
        where:{
          enrollmentId:enrollment.id
        }
    });

    const data = {
        id: ticket.id,
        status: ticket.status, 
        ticketTypeId: ticketTypeId,
        enrollmentId: enrollment.id,
        TicketType: {
          id: ticketType.id,
          name: ticketType.name,
          price: ticketType.price,
          isRemote: ticketType.isRemote,
          includesHotel: ticketType.includesHotel,
          createdAt: ticketType.createdAt,
          updatedAt: ticketType.updatedAt,
        },
        createdAt:ticket.createdAt,
        updatedAt: ticket.updatedAt
      };
    
      return data;
}

const paymentRepository = {
    ticketsByTypes,
    getTickets,
    createTicket
};

export default paymentRepository;