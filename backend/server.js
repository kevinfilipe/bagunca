var express        = require('express'),
    bodyParser     = require('body-parser'),
    cors           = require('cors'),
    app            = express(),
    morgan         = require("morgan"),
    expressWinston = require('express-winston');
    winston        = require('winston');
    port           = process.env.PORT || 9000,
    router         = express.Router();

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level:            'warn',
      filename:         './requisicoes-servidor.log',
      handleExceptions: true,
      json:             false,
      colorize:         true
    }),
    new (winston.transports.Console)({
      level:            'error',
      handleExceptions: true,
      json:             false,
      colorize:         true
    })
  ], 
  exitOnError: false 
});


logger.stream = { 
  write: function(message, encoding){ 
    logger.warn(message); 
  } 
}; 

var mongoose = require('mongoose'),
    Pessoa   = require('./app/models/pessoa'),
    Animal   = require('./app/models/pessoa');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(morgan('[:remote-addr - :date[clf]] HTTP/:http-version :status :method :url ":user-agent"', { "stream": logger.stream }));

router.get('/', function(req, res) {
    res.json({message: 'API - Pessoas | Animais'});
});

// Rotas para o Schema Pessoa

router.route('/pessoas')
    .post(function(req, res, next){
        if(!req.body.nome) {
            return res.status(400).json({ status: 400, mensagem: 'Informacoes da pessoa nao preenchidas corretamente', codigo: 00001 });
        }

        var pessoa = new Pessoa();
        pessoa.nome = req.body.nome;

        mongoose.connect('mongodb://localhost:27017/pessoas');

        pessoa.save(function(err) {
            mongoose.disconnect();

            if(err) { 
                logger.error(err);

                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            res.status(201).json(pessoa);
        });
    })
    .get(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.find(function(err, pessoas) {
            mongoose.disconnect();

            if(err) { 
                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            res.json(pessoas);
        });
    });

router.route('/pessoas/:id')
    .get(function(req, res) {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: 400, mensagem: 'Identificador da pessoa nao preenchido corretamente', codigo: 00002 });
        }

        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.findById(req.params.id, function(err, pessoa) {
            mongoose.disconnect();

            if(err) { 
                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            if(!pessoa) return res.status(404).json({ status: 404, mensagem: 'Pessoa nao encontrada', codigo: 00003 });

            res.json(pessoa);
        });
    })
    .put(function(req, res) {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: 400, mensagem: 'Identificador da pessoa nao preenchido corretamente', codigo: 00002 });
        }

        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.findById(req.params.id, function(err, pessoa) {
            if(err) { 
                mongoose.disconnect();

                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            if(!pessoa) {
                mongoose.disconnect();

                return res.status(404).json({ status: 404, mensagem: 'Pessoa nao encontrada', codigo: 00003 });
            } else if (!req.body.nome) {
                mongoose.disconnect();

                return res.status(400).json({ status: 400, mensagem: 'Informacoes da pessoa nao preenchidas corretamente', codigo: 00001 });
            } else if(pessoa.nome == req.body.nome) {
                mongoose.disconnect();

                return res.status(304).json(pessoa);
            }

            pessoa.nome = req.body.nome;

            pessoa.save(function(err) {
                mongoose.disconnect();

                if(err) { 
                    logger.error(err);
                
                    return res.json({ status: 200, mensagem: err.message, codigo: err.code });
                }

                res.json(pessoa);
            });
        });
    })
    .delete(function(req, res) {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: 400, mensagem: 'Identificador da pessoa nao preenchido corretamente', codigo: 00002 });
        }

        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.remove({
            _id: req.params.id
        }, function(err, pessoa) {
            mongoose.disconnect();

            if(!pessoa) {
                return res.status(404).json({ status: 404, mensagem: 'Pessoa nao encontrada', codigo: 00003 });
            }

            if(err) { 
                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            res.json(pessoa);
        });
    });

// Rotas para o Schema Animal

router.route('/animais')
    .post(function(req, res, next){
        if(!req.body.nome) {
            return res.status(400).json({ status: 400, mensagem: 'Informacoes do animal nao preenchidas corretamente', codigo: 00004 });
        }

        var animal = new Animal();
        animal.nome = req.body.nome;

        mongoose.connect('mongodb://localhost:27017/animais');

        animal.save(function(err) {
            mongoose.disconnect();

            if(err) { 
                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            res.status(201).json(animal);
        });
    })
    .get(function(req, res) {
        mongoose.connect('mongodb://localhost:27017/animais');

        Animal.find(function(err, animais) {
            mongoose.disconnect();

            if(err) { 
                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            res.json(animais);
        });
    });

router.route('/animais/:id')
    .get(function(req, res) {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: 400, mensagem: 'Identificador do animal nao preenchido corretamente', codigo: 00005 });
        }

        mongoose.connect('mongodb://localhost:27017/animais');

        Animal.findById(req.params.id, function(err, animal) {
            mongoose.disconnect();

            if(err) { 
                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            if(!animal) return res.status(404).json({ status: 404, mensagem: 'Animal nao encontrado', codigo: 00006 });

            res.json(animal);
        });
    })
    .put(function(req, res) {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: 400, mensagem: 'Identificador do animal nao preenchido corretamente', codigo: 00005 });
        }

        mongoose.connect('mongodb://localhost:27017/animais');

        Animal.findById(req.params.id, function(err, animal) {
            if(err) { 
                mongoose.disconnect();

                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            if(!animal) {
                mongoose.disconnect();

                return res.status(404).json({ status: 404, mensagem: 'Animal nao encontrado', codigo: 00006 });
            } else if (!req.body.nome) {
                mongoose.disconnect();

                return res.status(400).json({ status: 400, mensagem: 'Informacoes do animal nao preenchidas corretamente', codigo: 00004 });
            } else if(animal.nome == req.body.nome) {
                mongoose.disconnect();
                
                return res.status(304).json(animal);
            }

            animal.nome = req.body.nome;

            animal.save(function(err) {
                mongoose.disconnect();

                if(err) { 
                    logger.error(err);
                
                    return res.json({ status: 200, mensagem: err.message, codigo: err.code });
                }

                res.json(animal);
            });
        });
    })
    .delete(function(req, res) {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: 400, mensagem: 'Identificador do animal nao preenchido corretamente', codigo: 00005 });
        }

        mongoose.connect('mongodb://localhost:27017/pessoas');

        Pessoa.remove({
            _id: req.params.id
        }, function(err, animal) {
            mongoose.disconnect();

            if(!animal) {
                return res.status(404).json({ status: 404, mensagem: 'Animal nao encontrado', codigo: 00006 });
            }

            if(err) { 
                logger.error(err);
                
                return res.json({ status: 200, mensagem: err.message, codigo: err.code });
            }

            res.json(animal);
        });
    });

app.use('/api', router);

app.listen(port);