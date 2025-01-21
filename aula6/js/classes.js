// Classes
class Coisa {
    teste() {
        console.log('coisa 1')
    }
}

class PessoaClass extends Coisa {
    constructor(nome, idade) {
        super()
        this.nome = nome
        this.idade = idade

        this.#gostaDeTenis()
    }

    maiorDeIdade() {
        return this.idade >= 18
    }

    #gostaDeTenis() {
        return false
    }
}

const pessoa1 = new PessoaClass('adsadsd', 12)

function recebePessoa(pes) { }

// Réplica orientada a protótipo
function Coisa2() { }
Coisa2.teste = function () { console.log('coisa2!') }

function PessoaObj(nome, idade) {
    this.nome = nome
    this.idade = idade
}

PessoaObj.maiorDeIdade = function () {
    return this.idade >= 18
}

PessoaObj.gostaDeTenis = function () {
    return false
}

Object.setPrototypeOf(PessoaObj, Coisa2)

const pessoa2 = new PessoaObj('adsadsd', 12)
Object.setPrototypeOf(pessoa2, PessoaObj)

console.log(pessoa1)
console.log(pessoa2)