const express = require('express')
const cors = require('cors')
const { errors } = require('celebrate')

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json()) // para que ele entenda o formato enviado no corpo da requisição
app.use(routes) // tem que ser abaixo pois ele precisa entender o json enviado
app.use(errors()) // após as rotas, formata os erros de forma amigável

module.exports = app