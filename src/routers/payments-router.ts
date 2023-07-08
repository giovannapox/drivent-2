import { getTicketsTypes } from "@/controllers";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
    .get('/tickets')
    .get('/tickets/types', getTicketsTypes)
    .post('/tickets')
    .get('/payments')
    .post('/payments/process')

export { paymentsRouter };