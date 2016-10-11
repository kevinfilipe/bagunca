var mongoose = require('mongoose');

function validadorNomePessoa(nome) {
    return nome;
};

exports.Pessoa = mongoose.Schema({
    nome:  { required: true, type: String, unique: true, validate: validadorNomePessoa },
    email: { type: String }
});