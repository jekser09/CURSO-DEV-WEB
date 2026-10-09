const UsersModel = require('./User')

const USER = {
    get: async (req,res) =>{
        const { id } = req.params
        const users = await UsersModel.findOne({ _id:id })
        if(users) res.status(200).send(users)
        else res.sendStatus(204)
    },
    list: async (req,res) => {
        const users = await UsersModel.find()
        if(users) res.status(200).send(users)
        else res.sendStatus(404)
    },
    create: async (req,res) => {
        const users = new UsersModel(req.body)
        const savedUser = await users.save()
        res.status(201).send(savedUser._id)
    },
    update: async (req,res) => {
        const { id } = req.params
        const users = await UsersModel.findOneAndUpdate(
            { _id: id }, //Filtro
            req.body, //Datos a actualizar
            { runValidators: true } //Comportamiento: runValidators indica validar contra el modelo
        )
        if(users) res.status(204).end()
        else res.status(404).end()
    },
    destroy: async (req,res) => {
        const { id } = req.params
        const deletedUser = await UsersModel.findByIdAndDelete({ _id:id })
        if (deletedUser) res.status(204).end()
        else res.status(404).end()
    },
    unexpected: async (req,res) => {
        res.status(404).send('Esta pagina no existe')
    }
}

module.exports = USER