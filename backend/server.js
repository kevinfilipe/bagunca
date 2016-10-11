var express        = require('express'),
    api            = express(),
    router         = express.Router(),
    bodyParser     = require('body-parser'),
    cors           = require('cors'),
    morgan         = require('morgan'),
    apiPort        = process.env.API_PORT;

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(cors());
api.use(morgan(process.env.MORGAN_ENV));

app.get('*', function(req, res){
  res.send(404);
});

api.listen(apiPort);

console.info('API iniciada na porta ' + apiPort + '.');