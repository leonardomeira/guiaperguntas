const express = require("express")
const app = express()
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')

//Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão com o DB bem-sucedida')
    })
    .catch((e) => {
        console.log(e)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    Pergunta.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        })
    })
})

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            res.render('pergunta', {
                pergunta: pergunta
            })
        } else {
            res.redirect('/')
        }
    })

})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.listen(4000, console.log('Server em execução'))