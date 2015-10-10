module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var Empregado = require('../models/recurso.server.model.js');
    //var mailer = require('../utils/mailer.js');
    var mailgun = require('../utils/mailgun.js');
    var xlsx = require('../utils/xlsx.creator.js');

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Tarefas Server"');
        res.end('Unauthorized');
    };

    router.get('/recursos', isAuthenticated, function (req, res, next) {
        Empregado.getAllEmployees(function (err, docs) {
            res.json(docs);
        });
    });

    router.get('/tarefas', isAuthenticated, function (req, res, next) {
        Empregado.getTarefas(function (err, docs) {
            res.json(docs);
        });
    });


    router.post('/recursos', isAuthenticated, function (req, res, next) {
        Empregado.createEmpregado(req.body, function (err, docs) {
            if (err) {
                debug(err);
            }
            res.send("ok");
        });
    });

    router.get('/recursos/:id', isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        Empregado.getEmpregadoForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.get('/recursos/codigo/:id', isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        Empregado.getEmpregadoForCodigo(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/recursos/:id', isAuthenticated, function (req, res, next) {
        var emp = req.body;
        emp.updated_at = Date.now();
        Empregado.updateEmpregado(emp, function (err, docs) {
            if (err) {
                debug(err);
            }
            res.send("ok");
        });
    });

    router.post('/recursos/:id/tarefa', isAuthenticated, function (req, res, next) {
        var tarefa = req.body;
        Empregado.addTarefaToEmpregado(req.params.id, tarefa, function (err, docs) {
            if (err) {
                debug(err);
            }
            res.send("ok");
        });
    });

    router.put('/recursos/:id/tarefa/:tarefa', isAuthenticated, function (req, res, next) {
        Empregado.updateTarefaForEmpregado(req.params.id, req.body, function(){
           res.send("ok");
        });
    });

    router.get('/mailrecursos', isAuthenticated, function (req, res, next) {
        xlsx.createListaRecursos(function(ficheiro){
            mailgun.sendMail(req.user, ficheiro, function(data){
                res.status(data.code);
                res.send(data);
            });

        });

    });

    router.get('/filerecursos', isAuthenticated, function (req, res, next) {
        xlsx.createListaRecursos(function(ficheiro){
            res.setHeader("Content-type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Length", ficheiro.length);
            res.write(ficheiro);
            res.end();
        });

    });

    return router;
};