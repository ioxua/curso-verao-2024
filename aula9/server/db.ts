import fs from 'fs'
import { Usuario } from './dominio'

interface DB {
    getPorId(id: string): Usuario | null
    cadastrarUsuario(u: Usuario)
    listarUsuarios(): Array<Usuario>
    atualizarUsuario(u: Usuario)
    deletarUsuario(id: string)
}

interface DBEmArquivo extends DB {
    caminho: string
    lerArquivo(): Record<string, Usuario>
    escreverArquivo(dados: Record<string, Usuario>)
    emMemoria: DBEmMemoria
}

interface DBEmMemoria extends DB {
    registros: Record<string, Usuario>
}

// from https://stackoverflow.com/a/8084248/7988516
function gerarId(): string {
    return (Math.random() + 1).toString(36).substring(7);
}

const emMemoria: DBEmMemoria = {
    registros: {},
    getPorId(id: string): Usuario | null {
        if (this.registros.hasOwnProperty(id)) {
            return this.registros[id]
        }
        return null
    },
    cadastrarUsuario(u: Usuario) {
        const id = gerarId()
        u.id = id
        this.registros[id] = u
    },
    listarUsuarios(): Array<Usuario> {
        return Object.values(this.registros)
    },
    atualizarUsuario(u: Usuario) {
        if (!u.id) {
            throw new Error('usuário n tem id')
        }

        this.registros[u.id] = u
    },
    deletarUsuario(id: string) {
        if (!this.registros[id]) {
            throw new Error('usuário n existe')
        }

        delete this.registros[id]
    }
}

const emArquivo: DBEmArquivo = {
    caminho: 'db-files/db.json',
    emMemoria: emMemoria,
    lerArquivo() {
        const conteudo = fs.readFileSync(this.caminho).toString()
        const resultado: Record<string, Usuario> = JSON.parse(conteudo)
        return resultado
    },
    escreverArquivo(dados: Record<string, Usuario>) {
        const conteudo = JSON.stringify(dados)
        fs.writeFileSync(this.caminho, conteudo)
    },
    getPorId(id) {
        const dados = this.lerArquivo()
        emMemoria.registros = dados
        return emMemoria.getPorId(id)
    },
    cadastrarUsuario(u: Usuario) {
        const dados = this.lerArquivo()
        emMemoria.registros = dados
        emMemoria.cadastrarUsuario(u)
        this.escreverArquivo(emMemoria.registros)
    },
    listarUsuarios(): Array<Usuario> {
        const dados = this.lerArquivo()
        return Object.values(dados)
    },
    atualizarUsuario(u: Usuario) {
        const dados = this.lerArquivo()
        emMemoria.registros = dados
        emMemoria.atualizarUsuario(u)
        this.escreverArquivo(emMemoria.registros)
    },
    deletarUsuario(id: string) {
        const dados = this.lerArquivo()
        emMemoria.registros = dados
        emMemoria.deletarUsuario(id)
        this.escreverArquivo(emMemoria.registros)
    }
}

// para decidir qual implementação usaremos, altere o objeto exportado
// export default emMemoria
export default emArquivo