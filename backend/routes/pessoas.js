objectId = require('mongodb').ObjectID;

exports.consultarTodos = function(req, res, next) {
    req.schemas.Pessoa.find(function(err, pessoas) {
        if(err) next(err);
            
        res.json(200, pessoas);
    });
}

exports.consultar = function(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.sendStatus(400);
    }

    req.schemas.Pessoa.findById(req.params.id, function(err, pessoa) {
        if(err) next(err);
            
        if(!pessoa) res.sendStatus(404);

        res.json(200, pessoa);
    });
}

exports.adicionar = function(req, res, next){
    if(!req.body.nome) {
        res.sendStatus(400);
    }

    var pessoa = new req.schemas.Pessoa(req.body);

    pessoa.save(function(err) {
        if(err) next(err);

        res.json(201, pessoa);
    });
}

exports.atualizar = function(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400);
    }

    req.schemas.Pessoa.findById(req.params.id, function(err, pessoa) {
        if(err) next(err);

        if(!pessoa) {
            return res.sendStatus(404);
        } else if (!req.body.nome) {
            return res.sendStatus(400);
        } 

        pessoa.nome = req.body.nome;
        pessoa.email = req.body.email;

        pessoa.save(function(err) {
            if(err) next(err);

            res.json(pessoa);
        });
    });
}

exports.remover = function(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.sendStatus(400);
    }

    req.schemas.Pessoa.remove({
        _id: req.params.id
    }, function(err, pessoa) {
        if(err) next(error);

        if(!pessoa) res.sendStatus(404);

        res.sendStatus(200);
    });
}