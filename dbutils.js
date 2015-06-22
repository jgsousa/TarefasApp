var mongoose = require('mongoose');
mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongoDB server.');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
});
mongoose.connect('mongodb://localhost/tarefas');