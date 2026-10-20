const AnimalsModel = require('./model.animal')

const ANIMAL = {
    get: async (req,res) =>{
        const { id } = req.params
        const animals = await AnimalsModel.findOne({ _id:id })
        if(animals) res.status(200).send(animals)
        else res.sendStatus(204)
    },
    list: async (req,res) => {
        const animals = await AnimalsModel.find()
        if(animals) res.status(200).send(animals)
        else res.sendStatus(500)
    },
    create: async (req,res) => {
        const animals = new AnimalsModel(req.body)
        const savedAnimal = await animals.save()
        res.status(201).send(savedAnimal._id)
    },
    update: async (req,res) => {
        const { id } = req.params
        const animals = await AnimalsModel.findOneAndUpdate(
            { _id: id }, //Filtro
            req.body, //Datos a actualizar
            { runValidators: true } //Comportamiento: runValidators indica validar contra el modelo
        )
        if(animals) res.status(204).end()
        else res.status(404).end()
    },
    destroy: async (req,res) => {
        const { id } = req.params
        const deletedAnimal = await AnimalsModel.findByIdAndDelete({ _id:id })
        if (deletedAnimal) res.status(204).end()
        else res.status(404).end()
    },
    unexpected: async (req,res) => {
        res.status(404).send('Esta pagina no existe')
    }
}

module.exports = ANIMAL