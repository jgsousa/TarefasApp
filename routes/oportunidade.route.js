var express = require('express');
var router = express.Router();
var Oportunidade = require('../models/oportunidade.server.model.js');

router.get('/', function (req, res, next) {
    Oportunidade.getAllOportunidades(function (err, docs) {
        res.json(docs);
    });

});

router.post('/create', function (req, res, next) {
    Oportunidade.createOportunidade(req.body, function (err, docs) {
        res.send("ok");
    });
});

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Oportunidade.getOportunidadeForId(id, function (err, docs) {
        res.json(docs);
    });
});

router.put('/:id', function (req, res, next) {
    var obj = req.body;
    Oportunidade.updateOportunidade(obj, function (err, docs) {
        res.send("ok");
    });
});

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Oportunidade.deleteForId(id, function (err, docs) {
        res.send("ok");
    });
});

module.exports = router;