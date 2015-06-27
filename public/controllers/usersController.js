mainApp.controller("usersController", function ($scope, $modal, UserServices) {
    var getHandler = function (data, status, headers, config) {
        $scope.users = data;
    };

    UserServices.getAllUsers( function (data) {
            $scope.users = data;
        }, function (data, status, headers, config) {
            console.log("bosta");
        });

    $scope.deleteSelected = function (user) {
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
            UserServices.deleteUser($scope.selected._id,function (data) {
                var index = $scope.users.indexOf($scope.selected);
                if (index > -1) {
                    $scope.users.splice(index, 1);
                }
            }, function (err, data) {

            });
        });
    }
});

mainApp.controller("usersDetailController", function ($scope, $routeParams, ngToast, UserServices) {


    UserServices.getUserForId($routeParams.id, function(data){
        $scope.userData = data;
    }, function(err){});

    $scope.gravar = function () {

        if ($scope.modificarForm.$valid) {
            UserServices.updateUser($routeParams.id, $scope.userData,function (data) {
                ngToast.create('Gravado com sucesso');
            }, function(err){});
        }
    };
});

mainApp.controller("criarUserController", function ($scope, $routeParams, ngToast, UserServices) {
    $scope.gravar = function () {
        if ($scope.criarForm.$valid) {
            if ($scope.userData.password == $scope.confirmPass) {
                UserServices.createUser($scope.userData, function () {
                    ngToast.create('Gravado com sucesso');
                }, function(err){});
            }
            else {
                ngToast.danger("Passwords não são identicas");
            }
        }
    }
});