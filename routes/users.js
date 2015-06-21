var express = require('express');
var router = express.Router();

router.get('/utilizadores', function (req, res, next) {
    var db = req.mongoDb;
    db.getAllUsers(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
    console.log("passou por aqui");
});

router.post('/utilizadores', function (req, res, next) {
    var db = req.mongoDb;
    db.createUser(req.body, function (err, docs) {
        res.send("ok");
    });
    console.log("passou pelo POST");
});

router.get('/utilizadores/:id', function (req, res, next) {
    var id = req.params.id;
    var db = req.mongoDb;
    db.getUserForId(id, function (err, docs) {
        console.log("resposta singular");
        console.log(docs);
        res.json(docs);
    });
});

router.put('/utilizadores/:id', function (req, res, next) {
    var id = req.params.id;
    var db = req.mongoDb;
    var user = req.body;
    user.updated_at = Date.now();
    db.updateUser(user, function (err, docs) {
        res.send("ok");
    });
});

module.exports = router;
