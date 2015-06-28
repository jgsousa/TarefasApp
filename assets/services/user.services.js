mainApp.service('UserServices', ['$http', function ($http) {

    this.getAllUsers = function (successCallback, errorCallback) {
        $http.get('/users/utilizadores').
            success(successCallback).
            error(errorCallback);

    };

    this.getUserForId = function (id, successCallback, errorCallback) {
        $http.get('/users/utilizadores' + '/' + id).
            success(successCallback).
            error(errorCallback);
    };

    this.createUser = function (data, successCallback, errorCallback) {
        $http.post('/users/utilizadores', data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.updateUser = function (id, data, successCallback, errorCallback) {
        $http.put('/users/utilizadores' + '/' + id, data, {}).
            success(successCallback).
            error(errorCallback);
    };

    this.deleteUser = function (id, successCallback, errorCallback) {
        $http.delete('/users/utilizadores' + '/' + id, {}).
            success(successCallback).
            error(errorCallback);
    };

}]);