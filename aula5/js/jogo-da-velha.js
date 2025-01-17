const espacos = document.querySelectorAll('#jogo div')
const reset = document.getElementById('reset')
console.log(espacos)

const state = {
    jogoRolando: true,
    vezDoPrimeiro: true,
    posicoesVitoria: [
        // vitorias em linhas
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // colunas
        [0, 4, 8], [2, 4, 6]
        // [1, 1, 1, 0, 0, 0, 0, 0, 0], //0 1 2 X X X _ _ _ _ _ _
        // [0, 0, 0, 1, 1, 1, 0, 0, 0], //3 4 5 _ _ _ X X X _ _ _
        // [0, 0, 0, 0, 0, 0, 1, 1, 1], //6 7 8 _ _ _ _ _ _ X X X

        // // vitorias em colunas       // 0 1 2 3 4 5 6 7 8
        // [1, 0, 0, 1, 0, 0, 1, 0, 0], // X _ _ X _ _ X _ _
        // [0, 1, 0, 0, 1, 0, 0, 1, 0], // _ X _ _ X _ _ X _
        // [0, 0, 1, 0, 0, 1, 0, 0, 1], // _ _ X _ _ X _ _ X

        // // vitorias diag             // 0 1 2 3 4 5 6 7 8
        // [1, 0, 0, 0, 1, 0, 0, 0, 1], // X _ _ _ X _ _ _ X
        // [0, 0, 1, 0, 1, 0, 1, 0, 0], // _ _ X _ X _ X _ _
    ],
    // _ X O _ _ _ _ _ _
    tabuleiro: [null, null, null, null, null, null, null, null, null],
}

function verificarVencedor() {
    console.log(state.tabuleiro)
    for (const posicao of state.posicoesVitoria) {
        const et1 = posicao.map(it => state.tabuleiro[it])
        const xVenceu = et1.every(it => it == "X")
        const oVenceu = et1.every(it => it == "O")
        console.log(et1)
        // console.log(xVenceu)
        // console.log(oVenceu)
        const empate = state.tabuleiro.every(it => it !== null)

        if (xVenceu || oVenceu) {
            state.jogoRolando = false
            destacarVitoria(posicao)
        }

        if (xVenceu) {
            alert('X venceu!')
            // limparTabuleiro()
        } else if (oVenceu) {
            alert('O venceu!')
            // limparTabuleiro()
        } else if (empate) {
            alert('VELHA!')
            state.jogoRolando = false
            // limparTabuleiro()
        }
    }
}

function destacarVitoria(posicao) {
    const els = posicao
        .map(it => espacos[it])
        .forEach(el => {
            el.classList.add('vitoria')
        })
}

function limparTabuleiro() {
    state.tabuleiro = [null, null, null, null, null, null, null, null, null]
    state.vezDoPrimeiro = true
    for (const el of espacos) {
        el.innerText = ""
        el.classList.remove('preenchido', 'vitoria')
    }
}

function aoClicarEmEspaco(ev) {
    const el = ev.originalTarget
    const idx = indexDoElementoNoPai(el)

    if (state.tabuleiro[idx] === null && state.jogoRolando) {
        let caracter = "O"
        if (state.vezDoPrimeiro) {
            caracter = "X"
        }

        el.innerText = caracter
        state.tabuleiro[idx] = caracter

        state.vezDoPrimeiro = !state.vezDoPrimeiro
        el.classList.add('preenchido')

        verificarVencedor()
    }
}

// for (let i = 0; i < 10; i++)
for (const espaco of espacos) {
    espaco.onclick = aoClicarEmEspaco
}

reset.onclick = limparTabuleiro

// copiado descaradamente de https://stackoverflow.com/a/42337722/7988516
function indexDoElementoNoPai(el) {
    return Array.from(el.parentNode.children).indexOf(el);
}