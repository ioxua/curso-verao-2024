import { Request } from 'express';

interface Log {
    ip: string
    data: Date
}

const logs: Log[] = []

export function logarAcesso(req: Request) {
    logs.push({
        ip: req.ip ?? '',
        data: new Date(),
    })
}