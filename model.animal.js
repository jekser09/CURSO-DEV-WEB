const mongoose = require('mongoose')

const AnimalsModel = mongoose.model('Animal',{
    name: {type: String, required: true, minLenght: 3},
    type: {type: String, required: true, minLenght: 3}
})

module.exports = AnimalsModel