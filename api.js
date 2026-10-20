process.loadEnvFile()
//==================================================

const express = require('express')
const mongoose = require('mongoose')
const ANIMAL = require('./animal.controller')
const { Auth, isAuthenticated } = require('./auth.controller')
const app = express()

mongoose.connect(process.env.MONGO_URI)
app.use(express.json())
app.use(express.static(`${__dirname}/static`))

app.get('/',(req,res) => res.sendFile(`${__dirname}/static/TEMPLATES/Index.html`))

app.get('/form/animals', (req,res) => res.sendFile(`${__dirname}/static/TEMPLATES/FormAnimals.html`))
0
app.get('/animals', isAuthenticated, ANIMAL.list)
app.get('/animals/:id', isAuthenticated, ANIMAL.get)
app.post('/animals', isAuthenticated, ANIMAL.create)
app.put('/animals/:id', isAuthenticated, ANIMAL.update)
app.patch('/animals/:id', isAuthenticated, ANIMAL.update)
app.delete('/animals/:id', isAuthenticated, ANIMAL.destroy)

app.post('/login', Auth.login)
app.post('/register', Auth.register)

app.get('*splat', ANIMAL.unexpected)

app.listen(process.env.PORT,() => console.log(`Iniciando api en el puerto ${process.env.PORT}`))