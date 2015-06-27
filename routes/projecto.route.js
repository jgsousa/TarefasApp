var express = require('express');
var router = express.Router();
var Projecto = require('../models/projecto.server.model.js');

router.get('/projectos', function (req, res, next) {
    Projecto.getAllProjectos(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
    console.log("passou por aqui");
});

router.post('/projectos', function (req, res, next) {
    Projecto.createProjecto(req.body, function (err, docs) {
        res.send("ok");
    });
    console.log("passou pelo POST");
});

router.get('/projectos/:id', function (req, res, next) {
    var id = req.params.id;
    Projecto.getProjectoForId(id, function (err, docs) {
        console.log("resposta singular");
        console.log(docs);
        res.json(docs);
    });
});

router.put('/projectos/:id', function (req, res, next) {
    var projecto = req.body;
    Projecto.updateProjecto(projecto, function (err, docs) {
        res.send("ok");
    });
});

router.delete('/projectos/:id', function (req, res, next) {
    var projecto = req.params.id;
    Projecto.deleteForId(projecto, function (err, docs) {
        res.send("ok");
    });
});

module.exports = router;