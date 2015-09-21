mainApp.service('OportunidadeServices', ['$http', function ($http) {

    this.getAllOportunidades = function (successCallback, errorCallback) {
        $http.get('/oportunidades/').
            success(successCallback).
            error(errorCallback);

    };

    this.getOportunidadeForId = function (id, successCallback, errorCallback) {
        $http.get('/oportunidades/' + id).
            success(successCallback).
            error(errorCallback);
    };

    this.createOportunidade = function (data, successCallback, errorCallback) {
        $http.post('/oportunidades/create', data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.updateOportunidade = function (id, data, successCallback, errorCallback) {
        $http.put('/oportunidades/' + id, data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.deleteOportunidade = function (id, successCallback, errorCallback) {
        $http.delete('/oportunidades/' + id, {}).
            success(successCallback).
            error(errorCallback);
    };

}]);