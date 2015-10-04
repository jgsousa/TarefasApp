var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./dbutils');
var compress = require('compression');
var serveStatic = require('serve-static');
var debug = require('debug')('TarefasApp:server');

var expressSession = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users.route');
var recursos = require('./routes/recursos.route');
var projectos = require('./routes/projecto.route');
var budgets = require('./routes/budget.route');
var oportunidades = require('./routes/oportunidade.route');

var app = express();

var exposeDb = function(req, resp, next){
    req.mongoDb = db;
    next();
};

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.server.model.js');

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.getUserForId(id, function(err, user) {
        done(err, user);
    });
});


passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        // check in mongo if a user with username exists or not
        User.findOne({ 'name' :  username },
            function(err, user) {
                // In case of any error, return using the done method
                if (err) {
                    return done(err);
                }
                // Username does not exist, log error & redirect back
                if (!user){
                    debug('User Not Found with username ' + username);
                    return done(null, false);
                }
                // User exists but wrong password, log the error
                if (!user.verifyPassword(password)){
                    debug('Invalid Password');
                    return done(null, false);
                }
                // User and password both match, return user from
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
    app.use(serveStatic(__dirname + '/assets', {maxAge: 31557600000}));
} else {
    app.use(serveStatic(__dirname + '/assets'));
}

app.use('/bower_components', serveStatic(__dirname + '/bower_components', { maxAge: 31557600000 }));
app.use(expressSession({secret: 'explosions', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', exposeDb, routes(passport));
app.use('/users', exposeDb, users(passport));
app.use('/recursos', exposeDb, recursos(passport));
app.use('/projectos', exposeDb, projectos(passport));
app.use('/budget', exposeDb, budgets(passport));
app.use('/oportunidades', exposeDb, oportunidades(passport));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
