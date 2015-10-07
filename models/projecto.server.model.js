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

ProjectoSchema.methods.updateFromBacklog = function(periodo, projectoNovo){
    var projecto = this;
    projectoNovo.horas.forEach(function(element){
       if (element.periodo == periodo){
           Empregado.getEmpregadoForCodigo(element.recursoCodigo, function(err, employee){
               element.recursoId = employee._id;
               projecto.horas.push(element);
           });
       }
    });
};

module.exports = db.model('projectos', ProjectoSchema);