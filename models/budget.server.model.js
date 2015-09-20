var db = require('mongoose');

var BudgetSchema = new db.Schema({
    periodo: String,
    valor: Number,
    horas: Number
});

BudgetSchema.statics.getAllBudgets = function (callback) {
    this.find({}, {}, callback);
};

BudgetSchema.statics.getBudgetForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

BudgetSchema.statics.getBudgetForPeriodo = function (periodo, callback) {
    this.findOne({periodo: periodo}, {}, callback);
};

BudgetSchema.statics.updateBudget = function (budget, callback) {
    this.update({_id: budget._id}, budget, {upsert: true}, callback);
};

BudgetSchema.statics.createBudget = function (budget, callback) {
    var u = new this(budget);
    u.save(callback);
};

BudgetSchema.statics.deleteForId = function (id, callback) {
    this.getBudgetForId(id, function(err, budget){
        budget.remove(callback);
    });

};

module.exports = db.model('budgets', BudgetSchema);