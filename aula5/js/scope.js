
// var batata // interpretador faz isso aqui

console.log('==== scope(var)')

function demo() {
    // var meuNome // interpretador faz isso aqui
    console.log('dentro de demo() 1: ' + meuNome)
    meuNome = "ioxua"

    console.log('dentro de demo() 2: ' + meuNome)
    var meuNome
}

demo()

if (1 == 1) {
    var batata = "sou uma batatinha"
    console.log('dentro do if: ' + batata)
}

console.log('fora do if: ' + batata)
// descomente a prox linha para receber um erro:
// console.log('fora de demo(): ' + meuNome)

console.log('==== scope(const,let)')
if (1 == 1) {
    const minhaIdade = 25
    let minhaDtNascto = "25/12/00"

    // descomente a prox linha para receber um erro:
    // minhaIdade = 99
    minhaDtNascto = "05/05/1999"

    console.log('dentro do if(idade): ' + minhaIdade)
    console.log('dentro do if(dt): ' + minhaDtNascto)
}

// descomente as proxs linhas para receber um erro:
// console.log('fora do if: ' + minhaIdade)
console.log('fora do if: ' + minhaDtNascto)