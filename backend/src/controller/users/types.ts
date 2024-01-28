import { Request } from 'express'

export type GetExpenseReq = Request<{ date: string; amount: number; user: any }>;

