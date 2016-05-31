var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pessoas');

var Pessoa = require('./app/models/pessoa')

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

router.route('/pessoas')
    .post(function(req, res){
        var pessoa = new Pessoa();
        pessoa.nome = req.body.nome;

        pessoa.save(function(err) {
            if(err) res.send(err);

            res.json(pessoa);
            // res.json({message: 'Pessoa criada com sucesso!'});
        });
    })
    .get(function(req, res) {
        Pessoa.find(function(err, pessoas) {
            if(err) res.send(err);

            res.json(pessoas);
        });
    });

router.route('/pessoas/:id')
    .get(function(req, res) {
        Pessoa.findById(req.params.id, function(err, pessoa) {
            if(err) res.send(err);

            res.json(pessoa);
        });
    })
    .put(function(req, res) {
        Pessoa.findById(req.params.id, function(err, pessoa) {
            if(err) res.send(err);

            pessoa.nome = req.body.nome;

            pessoa.save(function(err) {
                if(err) res.send(err);

                res.json(pessoa);
                // res.json({message: 'Pessoa atualizada com sucesso!'})
            });
        });
    })
    .delete(function(req, res) {
        Pessoa.remove({
            _id: req.params.id
        }, function(err, pessoa) {
            if(err) res.send(err);

            res.json({message: 'Pessoa removida com sucesso!'});
        });
    });

app.use('/api', router);

app.listen(port);

console.log('Aplicacao iniciada na porta ' + port);