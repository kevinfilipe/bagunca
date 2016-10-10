objectId = require('mongodb').ObjectID;

exports.consultar = function(req, res, next) {
    req.schemas.Pessoa.find(function(err, animais) {
        if(err) { 
            console.log(err);
                
            return res.json({ status: 200, mensagem: err.message, codigo: err.code });
        }

        res.json(animais);
    });
};