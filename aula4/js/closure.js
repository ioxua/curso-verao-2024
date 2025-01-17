console.log('==== closure')

const cumprimentador = function (prefixo = "", sufixo = "") {
    return function (nome) {
        return prefixo + nome + sufixo;
    }
}
const olaMundo = cumprimentador("Olá, ", "!")
const helloWorld = cumprimentador("Hello ")

console.log(olaMundo("João"))
console.log(helloWorld("Damien"))