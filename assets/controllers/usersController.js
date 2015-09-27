mainApp.controller("usersController", ['$scope', 'UserServices', '$q', 'ModalServices',
    function ($scope, UserServices, $q, ModalServices) {

        UserServices.getAllUsers().then(function (data) {
            $scope.users = data;
        }, function (data) {

        });

        var deleteUser = function(code){
                return UserServices.deleteUser($scope.selected._id);
            },
            removeUserFromTable = function(){
                var index = $scope.users.indexOf($scope.selected);
                if (index > -1) {
                    $scope.users.splice(index, 1);
                }
            };

        $scope.requestDeleteSelected = function (user) {
            $scope.selected = user;
            var pop = ModalServices.popUpToConfirm( "Deseja apagar este utilizador?");

            pop.result.
                then(deleteUser).
                then(removeUserFromTable);
        };
    }]);

mainApp.controller("usersDetailController", ['$scope', '$routeParams', 'ngToast', 'UserServices', '$location',
    function ($scope, $routeParams, ngToast, UserServices, $location) {

        UserServices.getUserForId($routeParams.id).then(function (data) {
            if (data) {
                $scope.userData = data;
            } else {
                $location.path('/users/');
            }
        }, function (err) {
        });

        $scope.gravar = function () {

            if ($scope.modificarForm.$valid) {
                UserServices.updateUser($routeParams.id, $scope.userData).then(function (data) {
                    ngToast.create('Gravado com sucesso');
                }, function (err) {
                });
            }
        };
    }]);

mainApp.controller("criarUserController", ['$scope', '$routeParams', 'ngToast', 'UserServices',
    function ($scope, $routeParams, ngToast, UserServices) {
        $scope.gravar = function () {
            if ($scope.criarForm.$valid) {
                if ($scope.userData.password == $scope.confirmPass) {
                    UserServices.createUser($scope.userData).then(function () {
                        ngToast.create('Gravado com sucesso');
                    }, function (err) {
                    });
                } else {
                    ngToast.danger("Passwords não são identicas");
                }
            }
        };
    }]);