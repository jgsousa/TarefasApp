var db = require('mongoose');

var TarefaSchema = new db.Schema({
    name: String,
    createdById: String,
    projecto: String,
    dataInicio: Date,
    dataFim: Date,
    status: {type: String, default: "Aberta"},
    texto: String,
    horasConsumidas: Number
});

var EmployeeSchema = new db.Schema({
    codigo:String,
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
EmployeeSchema
    .virtual('tarefa.actual')
    .get(function () {
        if (this.tarefas != null && this.tarefas.length > 0) {
            return this.tarefas[0].name;
        }
    });

EmployeeSchema
    .virtual('tarefa.fim')
    .get(function () {
        if (this.tarefas != null && this.tarefas.length > 0) {
            return this.tarefas[0].dataFim;
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

EmployeeSchema.statics.getEmpregadoForCodigo = function (id, callback) {
    this.findOne({codigo: id}, {}, callback);
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

EmployeeSchema.statics.getTarefas = function (callback) {
    var processarTarefas = function (err, data) {
        var dados = [];
        var now = new Date();
        if (err) {
            callback(err);
        }
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].tarefas.length; j++) {
                if (data[i].tarefas[j].dataInicio < now && data[i].tarefas[j].dataFim > now) {
                    dados.push(data[i].tarefas[j]);
                }
            }
        }
        callback(undefined, dados);
    };

    var now = new Date();

    this.find({
        tarefas: {
            $elemMatch: {
                'dataInicio': {$lte: now},
                'dataFim': {$gte: now}
            }
        }
    }, {}, processarTarefas);
};

EmployeeSchema.statics.updateTarefaForEmpregado = function(employee, data, callback){
    this.findOneAndUpdate({"_id":employee, "tarefas._id":data._id},
        { "$set": { "tarefas.$": data } },
        callback
    );
};

module.exports = db.model('employees', EmployeeSchema);