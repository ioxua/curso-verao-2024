import capitalize from "capitalize"

console.log(capitalize.words('olá mundo do TS!'))

type Pessoa = {
    nome: string
}

interface Pessoa2 {
    nome: string
    asd(): number
}

let p: Pessoa

p = { nome: "asdad" }

const p2: Pessoa2 = {
    nome: "pessad",
    asd(): number {
        return 12
    },
}

p = p2

function cadastrarPessoa(p: Pessoa) {
    console.log('cadastrando pessoa:', p.nome)
}

cadastrarPessoa(p)
cadastrarPessoa(p2)
cadastrarPessoa({ nome: "asdas" })
cadastrarPessoa(123)