module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var User = require('../models/user.server.model.js');

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Tarefas Server"');
        res.end('Unauthorized');
    };

    router.get('/utilizadores', isAuthenticated,function (req, res, next) {
        User.getAllUsers(function (err, docs) {
            res.json(docs);
        });
    });

    router.post('/utilizadores',isAuthenticated, function (req, res, next) {
        User.createUser(req.body, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/utilizadores/:id',isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        User.getUserForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/utilizadores/:id',isAuthenticated, function (req, res, next) {
        var user = req.body;
        user.updated_at = Date.now();
        User.updateUser(user, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/utilizadores/:id',isAuthenticated, function (req, res, next) {
        var user = req.params.id;
        User.deleteForId(user, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};