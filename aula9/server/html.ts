import fs from 'fs'
import { Mensagem } from './msgs'

const base = './html'

const fragmentos = {
    head: lerPagina('fragmentos/head'),
    header: lerPagina('fragmentos/header'),
    footer: lerPagina('fragmentos/footer'),
    // msgSucesso: lerPagina('fragmentos/msg-sucesso'),
    // msgAlerta: lerPagina('fragmentos/msg-alerta'),
    // msgErro: lerPagina('fragmentos/msg-erro'),
}

export function lerPagina(arquivo: string): string {
    // FIXME: tratamento de erros aqui (try/catch)
    return fs.readFileSync(`${base}/${arquivo}.html`).toString()
}

export function converterMensagemParaHTML(msg: Mensagem): string {
    const vars = {
        mensagem: msg.conteudo,
    }

    switch (msg.tipo) {
        case 'sucesso':
            return paginaComVariaveis('fragmentos/msg-sucesso', vars)
        case 'erro':
            return paginaComVariaveis('fragmentos/msg-erro', vars)
        case 'alerta':
            return paginaComVariaveis('fragmentos/msg-alerta', vars)
    }
}

export function paginaComVariaveis(
    arquivo: string,
    variaveis: Record<string, string | undefined> = {},
    mensagem: Mensagem | null = null,
): string {
    const allVars = {
        alerta: '',
        ...variaveis,
        ...fragmentos,
    }

    let conteudo = lerPagina(arquivo)

    if (mensagem !== null) {
        const mensagemHtml = converterMensagemParaHTML(mensagem)
        allVars.alerta = mensagemHtml
    }

    for (const [name, val] of Object.entries(allVars)) {
        const key = `==${name}==`
        conteudo = conteudo.replaceAll(key, val)
    }

    return conteudo
}