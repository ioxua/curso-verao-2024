console.log('==== functions')

function ola1(name) {
    console.log('Olá ' + name + '!')
}
console.log('ola1: ' + ola1('Sandro'))

const ola2 = function (name) {
    console.log('Olá ' + name + '!')
}
ola2('Odair')

const multiplicar = function (a, b) {
    return a * b;
}
console.log(multiplicar(2, '57.123'))