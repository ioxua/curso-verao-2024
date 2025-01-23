import { Usuario } from './dominio'

const registros: Record<string, Usuario> = {}

// from https://stackoverflow.com/a/8084248/7988516
function gerarId(): string {
    return (Math.random() + 1).toString(36).substring(7);
}

export function cadastrarUsuario(u: Usuario) {
    const id = gerarId()
    u.id = id
    registros[id] = u
}

export function listarUsuarios(): Array<Usuario> {
    return Object.values(registros)
}

export function atualizarUsuario(u: Usuario) {
    if (!u.id) {
        throw new Error('usuário n tem id')
    }

    registros[u.id] = u
}

export function deletarUsuario(u: Usuario) {
    if (!u.id) {
        throw new Error('usuário n tem id')
    }

    delete registros[u.id]
}
