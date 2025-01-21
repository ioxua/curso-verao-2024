const canvas = document.getElementById("tela");
const controles = {
    cor: document.getElementById('cor'),
    tamanho: document.getElementById('tamanho'),
    tipo: document.getElementById('tipo'),
}

const ctx = canvas.getContext("2d");

const state = {
    mousePressionado: false,
    tamanho: 12,
    cor: 'black',
    tipo: 'circulo'
}

console.log(ctx)

function desenharCirculo(x, y) {
    const radius = state.tamanho / 2
    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI)
}

function desenharQuadrado(x, y) {
    const xx = x - state.tamanho / 2
    const yy = y - state.tamanho / 2
    ctx.rect(xx, yy, state.tamanho, state.tamanho)
}

function desenhar(x, y) {
    ctx.fillStyle = state.cor
    ctx.beginPath()

    switch (state.tipo) {
        case 'circulo':
            desenharCirculo(x, y)
            break
        case 'quadrado':
            desenharQuadrado(x, y)
            break
        default:
            throw new Error('tipo inválido!')
    }

    ctx.closePath()
    ctx.fill()
}

function limparCanvas() {
    ctx.reset()
}

function tentarDesenhar(x, y) {
    if (state.mousePressionado) {
        desenhar(x, y)
    }
}

function inicializarCanvas() {
    // canvas.addEventListener('click', function (ev) {
    //     desenharCirculo(ev.x, ev.y)
    // })

    canvas.addEventListener('mousedown', (ev) => {
        state.mousePressionado = true
    })

    canvas.addEventListener('mouseout', (ev) => {
        state.mousePressionado = false
    })

    canvas.addEventListener('mouseup', (ev) => {
        state.mousePressionado = false
        desenharCirculo(ev.x, ev.y)
    })

    canvas.addEventListener('mousemove', (ev) => {
        tentarDesenhar(ev.x, ev.y)
    })
}

function inicializarControles() {
    state.cor = controles.cor.value
    state.tamanho = controles.tamanho.valueAsNumber
    state.tipo = controles.tipo.value

    controles.cor.addEventListener('change', (ev) => {
        // console.log(ev)
        state.cor = ev.target.value
    })
    controles.tamanho.addEventListener('change', (ev) => {
        // console.log(ev.target)
        state.tamanho = ev.target.valueAsNumber
    })
    controles.tipo.addEventListener('change', (ev) => {
        console.log(ev)
        state.tipo = ev.target.value
    })
}

// inicialização
inicializarCanvas()
inicializarControles()