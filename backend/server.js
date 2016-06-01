var mongoose = require('mongoose');

var Pessoa = require('./app/models/pessoa');
var Animal = require('./app/models/pessoa');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Requisao \'' + req.method + '\' para o recurso \'' + req.originalUrl + '\' recebida...');
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    
    next();
});

router.get('/', function(req, res) {
    res.json({message: 'Bem vindo a nossa API!'});
});

// Rotas para o Schema Pessoa

router.route('/pessoas')
    .post(function(req, res){
        var pessoa = new Pessoa();
        pessoa.nome = req.body.nome;

        mongoose.connect('mongodb://localhost:27017/pessoas');

        pessoa.save(function(err) {
            mongoose.disconnect();

            if(err) res.send(err);

            res.json(pessoa);
        });
    })
    .get(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.find(function(err, pessoas) {
            mongoose.disconnect();

            if(err) res.send(err);

            res.json(pessoas);
        });
    });

router.route('/pessoas/:id')
    .get(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.findById(req.params.id, function(err, pessoa) {
            mongoose.disconnect();

            if(err) res.send(err);

            res.json(pessoa);
        });
    })
    .put(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.findById(req.params.id, function(err, pessoa) {
            if(err) res.send(err);

            pessoa.nome = req.body.nome;

            pessoa.save(function(err) {
                mongoose.disconnect();

                if(err) res.send(err);

                res.json(pessoa);
            });
        });
    })
    .delete(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.remove({
            _id: req.params.id
        }, function(err, pessoa) {
            mongoose.disconnect();

            if(err) res.send(err);

            res.json({});
        });
    });

// Rotas para o Schema Animal

router.route('/animais')
    .post(function(req, res){
        var animal = new Animal();
        animal.nome = req.body.nome;

        mongoose.connect('mongodb://localhost:27017/animais');

        animal.save(function(err) {
            mongoose.disconnect();

            if(err) res.send(err);

            res.json(animal);
        });
    })
    .get(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/animais');

        Animal.find(function(err, animais) {
            mongoose.disconnect();

            if(err) res.send(err);

            res.json(animais);
        });
    });

router.route('/animais/:id')
    .get(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/animais');

        Animal.findById(req.params.id, function(err, animal) {
            mongoose.disconnect();

            if(err) res.send(err);

            res.json(animal);
        });
    })
    .put(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/animais');

        Animal.findById(req.params.id, function(err, animal) {
            if(err) res.send(err);

            animal.nome = req.body.nome;

            animal.save(function(err) {
                mongoose.disconnect();

                if(err) res.send(err);

                res.json(animal);
            });
        });
    })
    .delete(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/animais');

        Animal.remove({
            _id: req.params.id
        }, function(err, animal) {
            mongoose.disconnect();
            
            if(err) res.send(err);

            res.json({});
        });
    });    

app.use('/api', router);

app.listen(port);

console.log('Aplicacao iniciada na porta ' + port);