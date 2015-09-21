var db = require('mongoose');

var OportunidadeSchema = new db.Schema({
    cliente:String,
    descritivo:String,
    estado:String,
    valor:Number,
    probabilidade:Number,
    detalhe:String
});

OportunidadeSchema.statics.getAllOportunidades = function (callback) {
    this.find({}, {}, callback);
};

OportunidadeSchema.statics.getOportunidadeForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

OportunidadeSchema.statics.updateOportunidade = function (Oportunidade, callback) {
    this.update({_id: Oportunidade._id}, Oportunidade, {upsert: true}, callback);
};

OportunidadeSchema.statics.createOportunidade = function (Oportunidade, callback) {
    var u = new this(Oportunidade);
    u.save(callback);
};

OportunidadeSchema.statics.deleteForId = function (id, callback) {
    this.getOportunidadeForId(id, function(err, Oportunidade){
        Oportunidade.remove(callback);
    });

};

module.exports = db.model('oportunidade', OportunidadeSchema);