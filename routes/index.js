module.exports = function (passport) {

    var express = require('express');
    var router = express.Router();

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    };

    /* GET home page. */
    router.get('/', isAuthenticated, function (req, res, next) {
        res.render('index', { username: req.user.name });
    });

    router.get('/login', function (req, res, next) {
        res.render('login', {});
    });

    router.post('/login', passport.authenticate('login',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }
    ), function (err, docs) {
        console.log("Passou login");
    });

    return router;
};
