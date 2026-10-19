process.loadEnvFile()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

const Animal = mongoose.model('Animal',{
    name: String,
    type: String
})

const crear = async () => {
    const animal = new Animal({
        name: 'chanchito',
        type: 'triste'
    })
    const savedAnimal = await animal.save()
    console.log(savedAnimal)
}

crear()

const buscarTodo = async () => {
    const users = await User.find()
    console.log(users)
}

//buscarTodo()

const buscarUno = async () => {
    const oneUser = await User.findOne({username:'chanchito feliz'})
    console.log(oneUser)
}

//buscarUno()

const actualizar = async () => {
    const user = await User.findOne({username:'chanchito feliz'})
    console.log(user)
    user.edad = 45
    await user.save()
}

//actualizar()

const eliminar = async () => {
    const user = await User.findOne({_id:'6ac66fac04a84edf4f89061d'})
    if(user){
        await user.deleteOne()
        console.log('Chanchito eliminado')
    }
    else console.log('No existe este chanchito')
}

//eliminar()