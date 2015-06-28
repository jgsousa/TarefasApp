var express = require('express');
var router = express.Router();
var Empregado = require('../models/recurso.server.model.js');

router.get('/recursos', function (req, res, next) {
    Empregado.getAllEmployees(function (err, docs) {
        res.json(docs);
    });
});

router.get('/tarefas', function (req, res, next) {
    Empregado.getTarefas(function (err, docs) {
        res.json(docs);
    });
    console.log("GET de tarefas");
});


router.post('/recursos', function (req, res, next) {
    Empregado.createEmpregado(req.body, function (err, docs) {
        if (err) {
            console.log(err);
        }
        res.send("ok");
    });
});

router.get('/recursos/:id', function (req, res, next) {
    var id = req.params.id;
    Empregado.getEmpregadoForId(id, function (err, docs) {
        res.json(docs);
    });
});

router.put('/recursos/:id', function (req, res, next) {
    console.log("Tentou actualizar");
    var emp = req.body;
    emp.updated_at = Date.now();
    Empregado.updateEmpregado(emp, function (err, docs) {
        if (err) {
            console.log(err);
        }
        res.send("ok");
    });
});

router.post('/recursos/:id/tarefa', function (req, res, next) {
    var tarefa = req.body;
    Empregado.addTarefaToEmpregado(req.params.id, tarefa, function (err, docs) {
        console.log(tarefa);
        if (err) {
            console.log(err);
        }
        res.send("ok");
    });
});

router.put('/recursos/:id/tarefa/:tarefa', function (req, res, next) {
    var tarefa = req.body;
    //......
});

module.exports = router;