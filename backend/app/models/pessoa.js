var mongoose = require('mongoose');

function validadorNomePessoa(nome) {
    return nome;
};

var pessoaSchema = mongoose.Schema({
    nome:  { required: true, type: String, unique: true, validate: validadorNomePessoa },
    email: { type: String }
});

module.exports = mongoose.model('Pessoa', pessoaSchema);