const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json()) // para que ele entenda o formato enviado no corpo da requisição
app.use(routes) // tem que ser abaixo pois ele precisa entender o json enviado

app.listen(3333)