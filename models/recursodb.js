var db = require('mongoose');

var TarefaSchema = new db.Schema({
    name: String,
    created_by_id: String,
    data_inicio: Date,
    data_fim: Date
});

var EmployeeSchema = new db.Schema({
    name: String,
    nivel: String,
    email: String,
    rateHora: Number,
    tarefas: [TarefaSchema]
});

EmployeeSchema
    .virtual('tem.tarefa')
    .get(function () {
        return !!(this.tarefas != null && this.tarefas.length > 0);
    });

EmployeeSchema.set('toObject', { virtuals: true });
EmployeeSchema.set('toJSON', { virtuals: true });

EmployeeSchema.statics.getAllEmployees = function (callback) {
    this.find({}, {}, callback);
};

EmployeeSchema.statics.getEmpregadoForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};


EmployeeSchema.statics.createEmpregado = function (empregado, callback) {
    var e = new this(empregado);
    e.save(callback);
};

EmployeeSchema.statics.updateEmpregado = function (empregado, callback) {
    this.update({_id: empregado._id}, empregado, {upsert: true}, callback);
};

module.exports = db.model('employees', EmployeeSchema);