var mongoose = require('mongoose');
var debug = require('debug')('TarefasApp:server');
mongoose.connection.on('open', function (ref) {
    debug('Connected to mongoDB server.');
    debug('It has the following collections:');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        debug(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
});
mongoose.connect('mongodb://localhost/tarefas');