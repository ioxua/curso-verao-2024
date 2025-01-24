
import { Request } from 'express';

export interface Mensagem {
    tipo: 'sucesso' | 'erro' | 'alerta'
    conteudo: string
}

export function getMensagemDaReq(req: Request): Mensagem | null {
    let tipo: Mensagem['tipo'] | null = null
    let msg: string = ''

    if (req.query['msg-sucesso'] !== undefined) {
        tipo = 'sucesso'
        msg = req.query['msg-sucesso']?.toString() ?? ''
    } else if (req.query['msg-alerta'] !== undefined) {
        tipo = 'alerta'
        msg = req.query['msg-alerta']?.toString() ?? ''
    } else if (req.query['msg-erro'] !== undefined) {
        tipo = 'erro'
        msg = req.query['msg-erro']?.toString() ?? ''
    }

    if (tipo !== null && msg !== '') {
        return {
            conteudo: msg,
            tipo: tipo,
        }
    }

    return null
}