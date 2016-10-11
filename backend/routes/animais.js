objectId = require('mongodb').ObjectID;

exports.consultarTodos = function(req, res, next) {
    req.schemas.Animal.find(function(err, animais) {
        if(err) next(err);
            
        res.json(200, animais);
    });
}

exports.consultar = function(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.sendStatus(400);
    }

    req.schemas.Animal.findById(req.params.id, function(err, animal) {
        if(err) next(err);
            
        if(!animal) res.sendStatus(404);

        res.json(200, animal);
    });
}

exports.adicionar = function(req, res, next){
    if(!req.body.nome) {
        res.sendStatus(400);
    }

    var animal = new req.schemas.Animal(req.body);

    animal.save(function(err) {
        if(err) next(err);

        res.json(201, animal);
    });
}

exports.atualizar = function(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400);
    }

    req.schemas.Animal.findById(req.params.id, function(err, animal) {
        if(err) next(err);

        if(!animal) {
            return res.sendStatus(404);
        } else if (!req.body.nome) {
            return res.sendStatus(400);
        } 

        animal.nome = req.body.nome;
        animal.raca = req.body.raca;

        animal.save(function(err) {
            if(err) next(err);

            res.json(animal);
        });
    });
}

exports.remover = function(req, res, next) {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.sendStatus(400);
    }

    req.schemas.Animal.remove({
        _id: req.params.id
    }, function(err, animal) {
        if(err) next(error);

        if(!animal) res.sendStatus(404);

        res.sendStatus(200);
    });
}