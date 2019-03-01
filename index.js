const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const categorias = require('./routes/categorias')
const publicacoes = require('./routes/publicacoes')

//Definindo view engine
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

app.get('/', async(request, response) => {    
    response.render('index')    
})

app.use('/categorias', categorias)
app.use('/publicacoes', publicacoes)

app.listen(port, (err) => {
    if(err){
        console.log('error')
    } else {
        console.log('Como-fazer Server is runngin port:', port)
    }
})