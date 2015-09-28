module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var Projecto = require('../models/projecto.server.model.js');

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Tarefas Server"');
        res.end('Unauthorized');
    };

    router.get('/projectos', isAuthenticated, function (req, res, next) {
        Projecto.getAllProjectos(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/projectos', isAuthenticated, function (req, res, next) {
        Projecto.createProjecto(req.body, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/projectos/:id', isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        Projecto.getProjectoForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/projectos/:id', isAuthenticated, function (req, res, next) {
        var projecto = req.body;
        Projecto.updateProjecto(projecto, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/projectos/:id', isAuthenticated, function (req, res, next) {
        var projecto = req.params.id;
        Projecto.deleteForId(projecto, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};