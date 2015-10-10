var db = require('mongoose');
var Empregado = require('./recurso.server.model.js');

var ProjectoSchema = new db.Schema({
    name: String,
    realizacao: Number,
    codigo: String,
    dataInicio: Date,
    dataFim: Date,
    cliente: String,
    texto: String,
    estado: String,
    horas:[{
        recursoId: String,
        periodo: String,
        numero: Number
    }]
});

ProjectoSchema.statics.getAllProjectos = function (callback) {
    this.find({}, {}, callback);
};

ProjectoSchema.statics.getProjectoForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

ProjectoSchema.statics.updateProjecto = function (projecto, callback) {
    this.update({_id: projecto._id}, projecto, {upsert: true}, callback);
};

ProjectoSchema.statics.createProjecto = function (projecto, callback) {
    var u = new this(projecto);
    u.save(callback);
};

ProjectoSchema.statics.deleteForId = function (id, callback) {
    this.getProjectoForId(id, function (err, projecto) {
        projecto.remove(callback);
    });
};

ProjectoSchema.methods.clearPeriodo = function(periodo){
    var projecto = this;
    this.horas.forEach(function(element, index){
        if (periodo == element.periodo){
            projecto.horas.splice(index, 1);
        }
    });
};

ProjectoSchema.methods.findHorasForRecurso = function(periodo, recursoId){
    var saida;
    this.horas.forEach(function(element){
       if (element.periodo == periodo && element.recursoId == recursoId){
           saida = element;
       }
    });
    return saida;
};

ProjectoSchema.methods.updateFromBacklog = function(periodo, projectoNovo, callback){
    var projecto = this;
    var changed = false;
    var empregados = {};
    Empregado.getAllEmployees(function(err, docs){
        docs.forEach(function(element){
            empregados[element.codigo] = element;
        });
        projectoNovo.horas.forEach(function(element){
            if (element.periodo == periodo){
                var empregado = empregados[element.recursoCodigo];
                if (empregado){
                    var horas = projecto.findHorasForRecurso(periodo, empregado._id);
                    if (!horas) { // se ainda não existe esta combinação criar
                        element.recursoId = empregado._id;
                        element.numero = element.valor;
                        projecto.horas.push(element);
                    } else {
                        horas.numero = element.valor;
                    }
                    changed = true;
                }
            }
        });
        if (changed){
            projecto.save(function(){
                callback();
            });
        } else {
            callback();
        }
    });
};

module.exports = db.model('projectos', ProjectoSchema);