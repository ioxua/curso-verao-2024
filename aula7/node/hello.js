const capitalize = require('capitalize')

console.log(capitalize('hello world!'))

function cadastraCliente(cliente) {
    console.log('recebi:', cliente)
    console.log('cadastrando o cliente: ' + cliente.nome)
}