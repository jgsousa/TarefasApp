var db = require('mongoose');

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

module.exports = db.model('projectos', ProjectoSchema);