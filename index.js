const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const categorias = require('./routes/categorias')

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

app.use('/categorias', categorias)

app.listen(port, (err) => {
    if(err){
        console.log('error')
    } else {
        console.log('Como-fazer Server is runngin port:', port)
    }
})