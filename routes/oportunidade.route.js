module.exports = function (passport) {

    var express = require('express');
    var router = express.Router();
    var Oportunidade = require('../models/oportunidade.server.model.js');

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Tarefas Server"');
        res.end('Unauthorized');
    };

    router.get('/', isAuthenticated, function (req, res, next) {
        Oportunidade.getAllOportunidades(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/create', isAuthenticated, function (req, res, next) {
        Oportunidade.createOportunidade(req.body, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/:id', isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        Oportunidade.getOportunidadeForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/:id', isAuthenticated, function (req, res, next) {
        var obj = req.body;
        Oportunidade.updateOportunidade(obj, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id', isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        Oportunidade.deleteForId(id, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};