process.loadEnvFile()
//==================================================

const express = require('express')
const mongoose = require('mongoose')
const ANIMAL = require('./animal.controller')
const app = express()

mongoose.connect(process.env.MONGO_URI)
app.use(express.json())
app.use(express.static(`${__dirname}/static`))

app.get('/',(req,res) => {
    res.sendFile(`${__dirname}/static/TEMPLATES/Index.html`)
})

app.get('/animals', ANIMAL.list)
app.get('/animals/:id', ANIMAL.get)
app.post('/animals', ANIMAL.create)
app.put('/animals/:id', ANIMAL.update)
app.patch('/animals/:id', ANIMAL.update)
app.delete('/animals/:id', ANIMAL.destroy)

app.get('*splat', ANIMAL.unexpected)

app.listen(process.env.PORT,()=>{
    console.log(`Iniciando api en el puerto ${process.env.PORT}`)
})