var express = require('express');
var router = express.Router();
var Projecto = require('../models/projecto.server.model.js');

router.get('/projectos', function (req, res, next) {
    Projecto.getAllProjectos(function (err, docs) {
        res.json(docs);
    });

});

router.post('/projectos', function (req, res, next) {
    Projecto.createProjecto(req.body, function (err, docs) {
        res.send("ok");
    });
});

router.get('/projectos/:id', function (req, res, next) {
    var id = req.params.id;
    Projecto.getProjectoForId(id, function (err, docs) {
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