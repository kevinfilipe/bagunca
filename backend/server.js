var express        = require('express'),
    app            = express(),
    router         = express.Router(),
    bodyParser     = require('body-parser'),
    cors           = require('cors'),
    momentTimeZone = require('moment-timezone'),
    nodeApiPort    = process.env.NODE_API_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

router.use(function (req, res, next) {
  console.log(
    '[' + momentTimeZone(new Date()).tz('America/Maceio').format('DD/MM/YYYY HH:mm:ss') + '] ' + 
    req.hostname    + ' ' + 
    req.protocol    + ' ' + 
    req.method      + ' ' + 
    req.originalUrl + ' ..'
  );

  next();
});

router.get('/', function(req, res) {
    res.json({message: 'API - Pessoas | Animais'});
});

var mongoose           = require('mongoose'),
    mongooseConnection = mongoose.createConnection('mongodb://' + hostMongoDB + '/' + databaseMongoDB),
    hostMongoDB        = process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT,
    databaseMongoDB    = process.env.MONGODB_PORT_27017_TCP_DATABASE,
    modelos            = require('./models'),
    rotas              = require('./routes');

mongooseConnection.on('error', console.error.bind(
    console, 'Falha na conexão com a base de dados:')
);
mongooseConnection.once('open', function () {
    console.info('Conexão com a base de dados \'' + databaseMongoDB + '\' estabelecida através do endereço ' + hostMongoDB + '.');
});

function schemas (req, res, next) {
  req.schemas = {
    Pessoa: mongooseConnection.model('Pessoa', modelos.Pessoa, 'pessoas')
  };
  
  return next();
}

app.get('/pessoas', schemas, rotas.pessoas.consultar);

app.use('/api', router);

app.listen(nodeApiPort);

console.info('API iniciada na porta ' + nodeApiPort + '.');