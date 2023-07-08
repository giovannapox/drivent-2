import { getTicketsByType } from "@/services/payments-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: Request, res: Response) {
    try {

    } catch (err) {
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
    try {

    } catch (err) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function getPayments(req: Request, res: Response) {
    try {

    } catch (err) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

export async function postPayments(req: Request, res: Response) {
    try {

    } catch (err) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}