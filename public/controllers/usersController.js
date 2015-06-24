mainApp.controller("usersController", function ($scope, $http, $modal) {
    var getHandler = function (data, status, headers, config) {
        $scope.users = data;
    };

    $http.get('/users/utilizadores').
        success(getHandler).
        error(function (data, status, headers, config) {
            console.log("bosta");
        });

    $scope.clicked = function () {
        alert("blahhhh");
    };

    $scope.deleteSelected = function(user){
        $scope.selected = user;
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/modals/popToConfirm.html',
            controller: 'popToConfirmController',
            size: 'sm',
            resolve: {
                texto: function () {
                    return "Deseja apagar este utilizador?";
                }
            }
        });

        modalInstance.result.then(function (code) {
            $http.delete('/users/utilizadores/' + $scope.selected._id, {}).
                success(function(data){
                    var index = $scope.users.indexOf($scope.selected);
                    if(index > -1){
                        $scope.users.splice(index,1);
                    }
                }).
                error(function(err, data){

                });
        });
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

        if ($scope.modificarForm.$valid) {
            $http.put('/users/utilizadores/' + $routeParams.id, $scope.userData, {}).
                success(function (data) {
                    ngToast.create('Gravado com sucesso');
                }).
                error(function (data) {

                });
        }
    };
});

mainApp.controller("criarUserController", function ($scope, $http, $routeParams, ngToast) {
    $scope.gravar = function () {
        if ($scope.criarForm.$valid) {
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
    }
});