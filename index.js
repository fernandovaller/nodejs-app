const express = require('express')
const app = express()
const api = require('./api')
const bodyParser = require('body-parser')

//Definindo view engine
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

app.get('/', async(request, response) => {
    const content = await axios.get('https://como-fazer-nodejs.firebaseio.com/teste.json')
    console.log(content.data)
    response.render('index', { i: content.data })
    //response.send(`<h1>Servidor rodando ${i}</h1>`)
})

app.get('/categorias/nova', (req, res) => {
    res.render('categorias/nova')
})

app.post('/categorias/nova', async(req, res) => {
    await api.create('categorias', {
        categoria: req.body.categoria
    })
    res.redirect('/categorias')
})

//Listar categorias
app.get('/categorias', async(req, res) => {
    const categorias = await api.list('categorias')
    res.render('categorias/index', {categorias: categorias })
})

app.get('/categorias/excluir/:id', async(req, res) => {
    await api.apagar('categorias', req.params.id)
    res.redirect('/categorias')
})

app.get('/categorias/editar/:id', async(req, res) => {
    const categoria = await api.get('categorias', req.params.id)
    res.render('categorias/editar', { categoria })
})

app.post('/categorias/editar/:id', async(req, res) => {
    await api.update('categorias', req.params.id, {
        categoria: req.body.categoria
    });
    res.redirect('/categorias')
})



app.listen(port, (err) => {
    if(err){
        console.log('error')
    } else {
        console.log('Como-fazer Server is runngin port:', port)
    }
})