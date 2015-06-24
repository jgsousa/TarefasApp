var express = require('express');
var router = express.Router();
var User = require('../models/userdb.js');

router.get('/utilizadores', function (req, res, next) {
    User.getAllUsers(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
    console.log("passou por aqui");
});

router.post('/utilizadores', function (req, res, next) {
    User.createUser(req.body, function (err, docs) {
        res.send("ok");
    });
    console.log("passou pelo POST");
});

router.get('/utilizadores/:id', function (req, res, next) {
    var id = req.params.id;
    User.getUserForId(id, function (err, docs) {
        console.log("resposta singular");
        console.log(docs);
        res.json(docs);
    });
});

router.put('/utilizadores/:id', function (req, res, next) {
    var id = req.params.id;
    var user = req.body;
    user.updated_at = Date.now();
    User.updateUser(user, function (err, docs) {
        res.send("ok");
    });
});

router.delete('/utilizadores/:id', function (req, res, next) {
    var user = req.params.id;
    User.deleteForId(user, function (err, docs) {
        res.send("ok");
    });
});

module.exports = router;
