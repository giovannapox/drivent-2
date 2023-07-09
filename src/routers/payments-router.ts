import { getPayment, getTickets, getTicketsTypes, postPayments, postTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    //.all("/*", authenticateToken)
    .get('/tickets', getTickets)
    .get('/tickets/types', getTicketsTypes)
    .post('/tickets', postTickets)
    .get('/payments', getPayment)
    .post('/payments/process', postPayments)

export { paymentsRouter };