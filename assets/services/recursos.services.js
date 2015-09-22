mainApp.service('EmployeeServices', ['$http',function ($http) {

    this.getAllEmployees = function (successCallback, errorCallback) {
        $http.get('/recursos/recursos').
            success(successCallback).
            error(errorCallback);

    };

    this.getAllPEmployees = function () {
        return $http.get('/recursos/recursos').
            then(function(response){
                return response.data;
            });
    };

    this.getEmployeeForId = function (id, successCallback, errorCallback) {
        $http.get('/recursos/recursos/' + id).
            success(successCallback).
            error(errorCallback);
    };

    this.createEmployee = function (data, successCallback, errorCallback){
        $http.post('/recursos/recursos/', data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.updateEmployee = function (id, data, successCallback, errorCallback) {
        $http.put('/recursos//recursos/' + id, data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.deleteEmployee = function (id, successCallback, errorCallback) {
        $http.delete('/recursos//recursos/' + id, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.createTarefaForEmployee = function (idEmpregado, data, successCallback, errorCallback) {
        $http.post('/recursos/recursos/' + idEmpregado + '/tarefa', data, {}).
            success(successCallback).
            error(errorCallback);
    };

}]);