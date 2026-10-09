const express = require('express')
const mongoose = require('mongoose')
const USER = require('./user.controller')
const app = express()
const port = 3000
//Config
app.use(express.json())
app.use(express.static(`${__dirname}/static`))
mongoose.connect('mongodb+srv://jekser09_db_user:oy2kR32GiPBL4G9N@cluster0.etnky4t.mongodb.net/?appName=Cluster0')

app.get('/',(req,res) => {
    res.sendFile(`${__dirname}/static/TEMPLATES/Index.html`)
})

app.get('/users', USER.list)
app.get('/users/:id', USER.get)
app.post('/users', USER.create)
app.put('/users/:id', USER.update)
app.patch('/users/:id', USER.update)
app.delete('/users/:id', USER.destroy)

app.get('*splat', USER.unexpected)



app.listen(port,()=>{console.log('Iniciando api')})