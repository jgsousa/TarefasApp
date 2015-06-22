var db = require('mongoose');

var UserSchema = new db.Schema({
    name: String,
    email: String,
    password: String,
    updated_at: { type: Date, default: Date.now },
    password_initial: Boolean
});

UserSchema.methods.verifyPassword = function(password){
    return true;
};

UserSchema.statics.getAllUsers = function( callback ){
    this.find({},{},callback);
};

UserSchema.statics.getUserForId = function(id, callback){
    this.findOne( { _id:id }, {}, callback);
};

UserSchema.statics.updateUser = function(user, callback){
    this.update({_id: user._id}, user, {upsert: true}, callback);
};

UserSchema.statics.createUser = function(user, callback){
    var u = new this(user);
    u.save(callback);
};

module.exports = db.model('users', UserSchema);