const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://jekser09_db_user:oy2kR32GiPBL4G9N@cluster0.etnky4t.mongodb.net/?appName=Cluster0')

const User = mongoose.model('User',{
    username:String,
    edad:Number
})

const crear = async () => {
    const user = new User({
        username: 'chanchito triste',
        edad: 25
    })
    const savedUser = await user.save()
    console.log(savedUser)
}

//crear()

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
    const user = await User.findOne({username:'chanchito triste'})
    if(user){
        await user.deleteOne()
        console.log('Chanchito eliminado')
    }
    else console.log('No existe este chanchito')
}

//eliminar()