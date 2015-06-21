mainApp.controller("usersController", function ($scope, $http) {
    var getHandler = function (data, status, headers, config) {
        $scope.users = data;
    }

    $http.get('/users/utilizadores').
        success(getHandler).
        error(function (data, status, headers, config) {
            console.log("bosta");
        });

    $scope.clicked = function () {
        alert("blahhhh");
    }
});

mainApp.controller("criarUserController", function ($scope, $http, $routeParams, ngToast) {
    $scope.gravar = function () {
        if ($scope.userData.password == $scope.confirmPass) {
            $http.post('/users/utilizadores/', $scope.userData, {}).
                success(function () {
                    ngToast.create('Gravado com sucesso');
                }).
                error();
        }
        else {
            ngToast.danger("Passwords não são identicas");
        }
    }
});

mainApp.controller("usersDetailController", function ($scope, $http, $routeParams, ngToast) {

    var getHandler = function (data, status, headers, config) {
        $scope.userData = data;
    };

    $http.get('/users/utilizadores/' + $routeParams.id).
        success(getHandler).
        error(function (data, status, headers, config) {
            console.log("bosta");
        });

    $scope.gravar = function () {
        $http.put('/users/utilizadores/' + $routeParams.id, $scope.userData, {}).
            success(function (data) {
                ngToast.create('Gravado com sucesso');
            }).
            error(function (data) {

            });
    };
});