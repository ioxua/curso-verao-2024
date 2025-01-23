import express from 'express'
import bodyParser from 'body-parser'
import { paginaComVariaveis } from './html'
import * as db from './db'
import { Usuario } from './dominio'

const port = 2345

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('static'))

app.get('/', (req, res) => {
    const usuarios = db.listarUsuarios()
        .map(usuario => paginaComVariaveis('fragmentos/crud-linha', { ...usuario }))
        .join('')

    res.send(paginaComVariaveis('tabela', {
        titulo: 'CRUD Tabela',
        tabela: usuarios,
    }))
})

app.get('/formulario', (req, res) => {
    res.send(paginaComVariaveis('form', {
        titulo: 'CRUD Form',
    }))
})

app.post('/cadastrar', (req, res) => {
    if (!req.body.name) {
        // TODO: enviar erro aqui
    }

    const usuario: Usuario = {
        nome: req.body.nome,
        senha: req.body.senha,
        usuario: req.body.usuario,
    }

    db.cadastrarUsuario(usuario)

    res.redirect('/?msg-sucesso=Usuário cadastrado com sucesso')
})

app.listen(port, () => {
    console.log(`escutando na porta ${port}`)
})