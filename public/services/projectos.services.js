mainApp.service('ProjectoServices', function ($http) {

    this.getAllProjectos = function (successCallback, errorCallback) {
        $http.get('/projectos/projectos').
            success(successCallback).
            error(errorCallback);

    };

    this.getProjectoForId = function (id, successCallback, errorCallback) {
        $http.get('/projectos/projectos' + '/' + id).
            success(successCallback).
            error(errorCallback);
    };

    this.createProjecto = function (data, successCallback, errorCallback) {
        $http.post('/projectos/projectos', data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.updateProjecto = function (id, data, successCallback, errorCallback) {
        console.log(data);
        $http.put('/projectos/projectos' + '/' + id, data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.deleteProjecto = function (id, successCallback, errorCallback) {
        $http.delete('/projectos/projectos' + '/' + id, {}).
            success(successCallback).
            error(errorCallback);
    };

});