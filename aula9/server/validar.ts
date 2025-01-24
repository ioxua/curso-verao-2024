import { Usuario } from "./dominio";

export function validarUsuario(usuario: Usuario, novo = false) {
    if (!novo && (usuario.id === undefined || usuario.id === '')) {
        throw new Error('Usuário existente não tem ID????')
    }

    if (usuario.nome.length < 4) {
        throw new Error('Nome de usuário deve ter ao menos 4 caracteres')
    }

    if (usuario.usuario.includes('batata')) {
        throw new Error('Palavras de ódio não são permitidas em usernames')
    }

    const validacaoSenha = validarSenha(usuario.senha)
    if (validacaoSenha !== null) {
        throw new Error(validacaoSenha)
    }
}

// TODO: estas validações não estão executando corretamente
const validacoes = {
    'Senha deve conter ao menos um caracter maiúsculo': /[A-Z]+/g,
    'Senha deve conter ao menos um caracter minúsculo': /[a-z]+/g,
    'Senha deve conter ao menos um caracter especial': /[\W\D]+/g,
    'Senha deve conter ao menos um caracter numérico': /[\d]+/g,
    'Senha deve conter ao menos cinco caracteres': /.{5,}/g,
}

// 1 char upper; 1 char lower; 1 special; 1 number; min 5 chars
function validarSenha(senha: string): string | null {
    console.log('senha', senha)
    for (const [key, val] of Object.entries(validacoes)) {
        console.log('testing rule', val.toString())
        if (!val.test(senha)) {
            console.log('FALHOU!')
            return key
        }
    }
    return null
}
