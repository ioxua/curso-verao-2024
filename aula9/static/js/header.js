
// path é uma variável global
const path = window.location.pathname;
(() => {
    // nav não :D
    const nav = document.querySelector(`a.nav-link[href="${path}"]`)
    console.log(nav)

    nav.classList.add('active', 'text-danger')

})()
