import { Request } from 'express'

export type GetTransactionReq = Request<{ date: Date; amount: string }>
