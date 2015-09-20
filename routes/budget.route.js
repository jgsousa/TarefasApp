var express = require('express');
var router = express.Router();
var Budget = require('../models/budget.server.model.js');

router.get('/', function (req, res, next) {
    Budget.getAllBudgets(function (err, docs) {
        res.json(docs);
    });

});

router.post('/create', function (req, res, next) {
    Budget.createBudget(req.body, function (err, docs) {
        //res.send("ok");
        res.send(docs);
    });
});

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Budget.getBudgetForPeriodo(id, function (err, docs) {
        res.json(docs);
    });
});

router.put('/:id', function (req, res, next) {
    var obj = req.body;
    Budget.updateBudget(obj, function (err, docs) {
        res.send("ok");
    });
});

router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    Budget.deleteForId(id, function (err, docs) {
        res.send("ok");
    });
});

module.exports = router;