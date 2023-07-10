import { Payment } from "@/protocols";
import ticketsService from "@/services/payments-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: Request, res: Response) {
    const authHeader = req.header('Authorization');

    const token = authHeader.split(' ')[1];

    try {
        const ticket = await ticketsService.getTicketsUser(token);
        return res.status(httpStatus.OK).send(ticket);
    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}


export async function getTicketsTypes(req: Request, res: Response) {
    try {
        const tickets = await ticketsService.getTicketsByType();
        return res.status(httpStatus.OK).send(tickets);
    } catch (err) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function postTickets(req: Request, res: Response) {
    const authHeader = req.header('Authorization');
    const { ticketTypeId } = req.body;

    const token = authHeader.split(' ')[1];
    try {
        const ticket = await ticketsService.postNewTicket(token, parseInt(ticketTypeId));
        return res.status(httpStatus.CREATED).send(ticket);
    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getPayment(req: Request, res: Response) {
    const authHeader = req.header('Authorization');
    const { ticketTypeId } = req.body;

    const token = authHeader.split(' ')[1];

    try {
        const payment = await ticketsService.getPayments(token, Number(ticketTypeId))
        return res.status(httpStatus.OK).send(payment)
    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (err.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function postPayments(req: Request, res: Response) {
    const authHeader = req.header('Authorization');
    const payment = req.body as Payment;

    const token = authHeader.split(' ')[1];

    try {
        const payments = await ticketsService.postPayment(token, payment)
        return res.status(httpStatus.OK).send(payments);
    } catch (err) {
        if (err.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(err)
        }
        if (err.name === "UnauthorizedError") {
            return res.status(httpStatus.UNAUTHORIZED).send(err)
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}