var mongoose = require('mongoose');

function validadorNomeAnimal(nome) {
    return nome;
};

var animalSchema = mongoose.Schema({
    nome: { required: true, type: String, unique: true, validate: validadorNomeAnimal }
});

module.exports = mongoose.model('Animal', animalSchema);