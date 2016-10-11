var mongoose = require('mongoose');

function validadorNome(nome) {
    return nome;
};

exports.Pessoa = mongoose.Schema({
    nome:  { required: true, type: String, unique: true, validate: validadorNome },
    email: { type: String }
});

exports.Animal = mongoose.Schema({
    nome: { required: true, type: String, unique: true, validate: validadorNome },
    raca: { type: String }
});