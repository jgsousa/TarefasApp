var db = require('mongoose');

db.connect('mongodb://localhost/tarefas');
console.log("Connected to MongoDB");

var UserSchema = new db.Schema({
    name: String,
    email: String,
    password: String,
    updated_at: { type: Date, default: Date.now },
    password_initial: Boolean
});

var EmployeeSchema = new db.Schema({
    name: String,
    nivel: Object,
    tarefas: Array
});

var NivelSchema = new db.Schema({
    name: String,
    nivel: Number
});

var TarefaSchema = new db.Schema({
    name: String,
    created_by_id: String,
    data_inicio: Date,
    data_fim: Date
});

exports.db = db;
exports.User = db.model('User', UserSchema);
exports.Tarefa = db.model('Tarefa', TarefaSchema);
exports.Empregado = db.model('Empregado', EmployeeSchema);
exports.Nivel = db.model('Nivel', NivelSchema);

exports.getAllUsers = function( callback ){
    exports.User.find({},{},callback);
};

exports.getUserForId = function(id, callback){
    exports.User.findOne( { _id:id }, {}, callback);
};

exports.updateUser = function(user, callback){
    exports.User.update({_id: user._id}, user, {upsert: true}, callback);
};

exports.createUser = function(user, callback){
    exports.User.create({_id: user._id}, user, {}, callback);
}

exports.getAllEmployess = function(){
    exports.Empregado.find({},{}, function(err, docs){
        return docs;
    })
};