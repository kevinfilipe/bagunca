var express    = require('express'),
    api        = express(),
    router     = express.Router(),
    bodyParser = require('body-parser'),
    cors       = require('cors'),
    morgan     = require('morgan'),
    apiPort    = process.env.API_PORT;

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(cors());
api.use(morgan(process.env.MORGAN_ENV));

api.get('/api', function(req, res){
    res.send('API');
});

var hostMongoDB        = process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT,
    databaseMongoDB    = process.env.MONGODB_PORT_27017_TCP_DATABASE,
    mongoose           = require('mongoose'),
    mongooseConnection = mongoose.createConnection('mongodb://' + hostMongoDB + '/' + databaseMongoDB),
    modelos            = require('./models'),
    rotas              = require('./routes');

mongooseConnection.on('error', console.error.bind(
    console, 'Falha na conexão com a base de dados:')
);
mongooseConnection.once('open', function () {
    console.info('Conexão com a base de dados \'' + databaseMongoDB + '\' [' + hostMongoDB + '] estabelecida.');
});

function schemas (req, res, next) {
  req.schemas = {
    Pessoa: mongooseConnection.model('Pessoa', modelos.Pessoa, 'pessoas')
  };

  return next();
}

api.get('/api/pessoas', schemas, rotas.pessoas.consultarTodos);
api.get('/api/pessoas/:id', schemas, rotas.pessoas.consultar);
api.post('/api/pessoas', schemas, rotas.pessoas.adicionar);
api.put('/api/pessoas/:id', schemas, rotas.pessoas.atualizar);
api.delete('/api/pessoas/:id', schemas, rotas.pessoas.remover);

api.get('*', function(req, res){
  res.sendStatus(404);
});

api.listen(apiPort);

console.info('API iniciada na porta ' + apiPort + '.');