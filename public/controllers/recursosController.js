var niveis = [
    "Partner",
    "AP",
    "Senior Manager",
    "Manager",
    "Senior Consultant",
    "Consultant",
    "Analista"
];

mainApp.controller("recursosController", function ($scope, $http, $filter) {
    var getHandler = function (data, status, headers, config) {
        $scope.empregados = data;
    }

    $http.get('/recursos/recursos').
        success(getHandler).
        error(function (data, status, headers, config) {
            console.log("bosta");
        });

    $scope.sortNome = function () {
        $scope.empregados = $filter('orderBy')($scope.empregados, "name");
    }
    $scope.sortNivel = function () {
        $scope.empregados = $filter('orderBy')($scope.empregados, "nivel");
    }
});

mainApp.controller("recursosDetailController", function ($scope, $http, $routeParams, ngToast, $location) {

    $scope.niveis = niveis;

    var getHandler = function (data, status, headers, config) {
        $scope.empData = data;
    };

    $http.get('/recursos/recursos/' + $routeParams.id).
        success(getHandler).
        error(function (data, status, headers, config) {
            console.log("bosta");
        });

    $scope.gravar = function () {

        if ($scope.modificarForm.$valid) {
            $http.put('/recursos/recursos/' + $routeParams.id, $scope.empData, {}).
                success(function (data) {
                    $location.path('/recursos');
                }).
                error(function (data) {

                });
        }
    };

    $scope.adicionar = function () {
        $location.path('/recursos/' + $routeParams.id + '/novatarefa');
    };

    $scope.navegarTarefa = function (tarefa) {
        $location.path('/recursos/' + $routeParams.id + '/tarefa/' + tarefa._id);
    }
});

mainApp.controller("criarRecursosController", function ($scope, $http, ngToast, $location) {
    $scope.empData = {};
    $scope.empData.nivel = "Escolher nível";
    $scope.niveis = niveis;

    $scope.gravar = function () {
        if ($scope.criarForm.$valid && $scope.empData.nivel != "Escolher nível") {
            $http.post('/recursos/recursos', $scope.empData, {}).
                success(function () {
                    $location.path('/recursos');
                }).
                error();
        }
        else {
            ngToast.create('Escolher nível');
        }
    };

    $scope.dropSelected = function (item) {
        $scope.empData.nivel = item;
    };
});