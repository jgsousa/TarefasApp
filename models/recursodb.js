var db = require('mongoose');

var TarefaSchema = new db.Schema({
    name: String,
    createdById: String,
    projecto: String,
    dataInicio: Date,
    dataFim: Date,
    status: {type: String, default: "Aberta"},
    texto: String
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
        if (this.tarefas != null && this.tarefas.length > 0) {
            return "Sim";
        } else {
            return "Não";
        }
    });

EmployeeSchema.set('toObject', {virtuals: true});
EmployeeSchema.set('toJSON', {virtuals: true});

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

EmployeeSchema.statics.addTarefaToEmpregado = function (id, tarefa, callback) {
    this.getEmpregadoForId(id, function (err, empregado) {
        if (!err) {
            empregado.tarefas.push(tarefa);
            db.model('employees', EmployeeSchema).
                update({_id: empregado._id}, empregado.toObject(), {upsert: true}, callback);
        }
    });
};

module.exports = db.model('employees', EmployeeSchema);
;