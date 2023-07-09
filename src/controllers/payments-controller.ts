import { Payment } from "@/protocols";
import { getPayments, getTicketsByType, getTicketsUser, postNewTicket, postPayment } from "@/services/payments-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: Request, res: Response) {
    const { authorization } = req.headers;
    try {
        const ticket = await getTicketsUser(authorization.toString());
        return res.status(httpStatus.OK).send(ticket);
    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getTicketsTypes(req: Request, res: Response) {
    try {
        const tickets = await getTicketsByType();
        return res.status(httpStatus.OK).send(tickets);
    } catch (err) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function postTickets(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { ticketTypeId } = req.body;
    try {
        const ticket = await postNewTicket(authorization.toString(), parseInt(ticketTypeId));
        return res.status(httpStatus.CREATED).send(ticket);
    } catch (err) {
        if (err.name === 'NotFoundError') {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getPayment(req: Request, res: Response) {
    const { authorization } = req.headers
    const { ticketId } = req.query
    try {
        const payment = await getPayments(authorization.toString(), Number(ticketId))
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
    const { authorization } = req.headers;
    const payment = req.body as Payment;

    try {
        const payments = await postPayment(authorization.toString(), payment)
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