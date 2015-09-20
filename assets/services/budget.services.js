mainApp.service('BudgetServices', ['$http', function ($http) {

    this.getAllBudgets = function (successCallback, errorCallback) {
        $http.get('/budget/').
            success(successCallback).
            error(errorCallback);

    };

    this.getBudgetForId = function (id, successCallback, errorCallback) {
        $http.get('/budget/' + id).
            success(successCallback).
            error(errorCallback);
    };

    this.createBudget = function (data, successCallback, errorCallback) {
        $http.post('/budget/create/', data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.updateBudget = function (id, data, successCallback, errorCallback) {
        $http.put('/budget/' + id, data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.deleteBudget = function (id, successCallback, errorCallback) {
        $http.delete('/budget/' + id, {}).
            success(successCallback).
            error(errorCallback);
    };

}]);
