import { getTickets, getTicketsTypes, postTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .all("/*", authenticateToken)
    .get('/tickets', getTickets)
    .get('/tickets/types', getTicketsTypes)
    .post('/tickets', postTickets)
    .get('/payments')
    .post('/payments/process')

export { paymentsRouter };