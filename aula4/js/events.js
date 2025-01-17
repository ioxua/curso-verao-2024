const lampada = document.getElementById('lampada')
const fiosinho = document.getElementById('fiosinho')

const sfx = new Audio('sfx/interruptor.mp3')

fiosinho.onclick = function () {
    lampada.classList.toggle('acesa')
    sfx.play()
}