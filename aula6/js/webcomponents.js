class Contador extends HTMLElement {
    #estado = 0

    #maisEl
    #menosEl
    #numeroEl//: HTMLElement

    connectedCallback() {
        console.log(this)
        const usarShadowDOM = this.getAttribute('use-shadow-dom') !== null

        this.#inicializarUI(usarShadowDOM)
        this.#inicializarEventos()
    }

    #inicializarUI(shadowDOM = false) {
        this.#maisEl = document.createElement('button')
        this.#menosEl = document.createElement('button')
        this.#numeroEl = document.createElement('span')

        this.#maisEl.innerText = '+'
        this.#menosEl.innerText = '-'
        this.#numeroEl.innerText = this.#estado

        if (shadowDOM) {
            const shadow = this.attachShadow({ mode: "open" })
            shadow.appendChild(this.#menosEl)
            shadow.appendChild(this.#numeroEl)
            shadow.appendChild(this.#maisEl)
        } else {
            this.appendChild(this.#menosEl)
            this.appendChild(this.#numeroEl)
            this.appendChild(this.#maisEl)
        }
    }

    #atualizarNumero() {
        this.#numeroEl.innerText = this.#estado
    }

    #inicializarEventos() {
        // Descomente esta linha para ver a diferença entre function e ()=>{}
        // this.#maisEl.addEventListener('click', function () {
        this.#maisEl.addEventListener('click', () => {
            // console.log(this)
            this.#estado++
            this.#atualizarNumero()
        })
        this.#menosEl.addEventListener('click', () => {
            // console.log(this)
            this.#estado--
            this.#atualizarNumero()
        })
    }
}

customElements.define("meu-contador", Contador);