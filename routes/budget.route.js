module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var Budget = require('../models/budget.server.model.js');

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Tarefas Server"');
        res.end('Unauthorized');
    };

    router.get('/', isAuthenticated, function (req, res, next) {
        Budget.getAllBudgets(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/create', isAuthenticated, function (req, res, next) {
        Budget.createBudget(req.body, function (err, docs) {
            //res.send("ok");
            res.send(docs);
        });
    });

    router.get('/:id', isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        Budget.getBudgetForPeriodo(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/:id', isAuthenticated, function (req, res, next) {
        var obj = req.body;
        Budget.updateBudget(obj, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id',isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        Budget.deleteForId(id, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};
