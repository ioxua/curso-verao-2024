import express from 'express'
import bodyParser from 'body-parser'
import { paginaComVariaveis } from './html'
import db from './db'
import { Usuario } from './dominio'
import { getMensagemDaReq } from './msgs'
import { validarUsuario } from './validar'

const port = 2345

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('static'))

app.get('/', (req, res) => {
    const msg = getMensagemDaReq(req)
    const usuarios = db.listarUsuarios()
        .map(usuario => paginaComVariaveis('fragmentos/crud-linha', { ...usuario }))
        .join('')

    res.send(paginaComVariaveis('tabela', {
        titulo: 'CRUD Tabela',
        tabela: usuarios,
    }, msg))
})

app.get('/formulario', (req, res) => {
    const msg = getMensagemDaReq(req)

    res.send(paginaComVariaveis('form', {
        titulo: 'CRUD Form',
        formUrl: '/cadastrar',
        inputId: '',
        valueNome: '',
        valueUsuario: '',
        valueSenha: '',
    }, msg))
})

app.get('/editar', (req, res) => {
    const id = req.query['id']?.toString() ?? ''
    if (id === '') {
        res.redirect('/?msg-erro=Impossível editar id inválido')
        return
    }

    const usuario = db.getPorId(id)
    if (usuario === null) {
        res.redirect('/?msg-erro=ID não existe')
        return
    }

    const msg = getMensagemDaReq(req)

    res.send(paginaComVariaveis('form', {
        titulo: 'CRUD Form',
        formUrl: '/editar',
        inputId: `<input type=hidden name=id value="${id}" />`,
        valueNome: usuario.nome,
        valueUsuario: usuario.usuario,
        valueSenha: usuario.senha,
    }, msg))
})

app.post('/editar', (req, res) => {
    const usuario: Usuario = {
        id: req.body.id,
        nome: req.body.nome,
        senha: req.body.senha,
        usuario: req.body.usuario,
    }

    try {
        validarUsuario(usuario, false)
    } catch (e) {
        res.redirect(`/editar?id=${req.body.id}&msg-erro=${e.message}`)
        return
    }

    db.atualizarUsuario(usuario)
    res.redirect('/?msg-sucesso=Usuário atualizado com sucesso')
})

app.post('/cadastrar', (req, res) => {
    const usuario: Usuario = {
        nome: req.body.nome,
        senha: req.body.senha,
        usuario: req.body.usuario,
    }

    try {
        validarUsuario(usuario, true)
    } catch (e) {
        res.redirect(`/formulario?msg-erro=${e.message}`)
        return
    }

    db.cadastrarUsuario(usuario)

    res.redirect('/?msg-sucesso=Usuário cadastrado com sucesso')
})

app.get('/excluir', (req, res) => {
    const id = req.query['id']?.toString() ?? ''

    if (!id) {
        // fazer algo se n tiver id
        res.redirect('/?msg-alerta=Usuário não existe')
        return
    }

    try {
        db.deletarUsuario(id)
    } catch (e) {
        res.redirect(`/?msg-erro=${e.message}`)
    }

    res.redirect('/?msg-sucesso=Usuário excluído com sucesso')
})

app.listen(port, () => {
    console.log(`escutando na porta ${port}`)
})