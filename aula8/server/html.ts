import fs from 'fs'

const base = './html'

const fragmentos = {
    head: lerPagina('fragmentos/head'),
    header: lerPagina('fragmentos/header'),
    footer: lerPagina('fragmentos/footer'),
}

export function lerPagina(arquivo: string): string {
    // FIXME: tratamento de erros aqui (try/catch)
    return fs.readFileSync(`${base}/${arquivo}.html`).toString()
}

export function paginaComVariaveis(
    arquivo: string,
    variaveis: Record<string, string | undefined> = {},
): string {
    const allVars = {
        ...variaveis,
        ...fragmentos,
    }

    let conteudo = lerPagina(arquivo)

    for (const [name, val] of Object.entries(allVars)) {
        const key = `==${name}==`
        conteudo = conteudo.replaceAll(key, val)
    }

    return conteudo
}