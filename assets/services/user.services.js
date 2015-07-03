mainApp.service('UserServices', ['$http', '$q', function ($http, $q) {

    this.getAllUsers = function () {
        return $http.get('/users/utilizadores').
            then(function(response){
               return response.data;
            });
    };

    this.getUserForId = function (id) {
        return $http.get('/users/utilizadores' + '/' + id).
            then(function(response){
                return response.data;
            },function(response){
               $q.reject(response.data);
            });
    };

    this.createUser = function (data) {
        return $http.post('/users/utilizadores', data, {}).
            then(function(response){
              return response.data;
            });
    };

    this.updateUser = function (id, data) {
        return $http.put('/users/utilizadores' + '/' + id, data, {}).
            then(function(response){
               return response.data;
            });
    };

    this.deleteUser = function (id) {
        return $http.delete('/users/utilizadores' + '/' + id, {}).
            then(function(response){
               return id;
            });
    };

}]);