mainApp.service('OportunidadeServices', ['$http', function ($http) {

    this.getAllOportunidades = function (successCallback, errorCallback) {
        return $http.get('/oportunidades/').
            then(function(response){
                return response.data;
            });

    };

    this.getOportunidadeForId = function (id, successCallback, errorCallback) {
        return $http.get('/oportunidades/' + id).
            then(function(response){
                return response.data;
            });
    };

    this.createOportunidade = function (data, successCallback, errorCallback) {
        return $http.post('/oportunidades/create', data, {}).
            then(function(response){
                return response.data;
            });
    };

    this.updateOportunidade = function (id, data, successCallback, errorCallback) {
        return $http.put('/oportunidades/' + id, data, {}).
            then(function(response){
                return response.data;
            });
    };

    this.deleteOportunidade = function (id, successCallback, errorCallback) {
        return  $http.delete('/oportunidades/' + id, {}).
            then(function(response){
                return response.data;
            });
    };

}]);