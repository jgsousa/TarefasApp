var niveis = [
    "Partner",
    "AP",
    "Senior Manager",
    "Manager",
    "Senior Consultant",
    "Consultant",
    "Analista"
];

mainApp.controller("recursosController", function ($scope, $http) {
    var getHandler = function (data, status, headers, config) {
        $scope.empregados = data;
    }

    $http.get('/recursos/recursos').
        success(getHandler).
        error(function (data, status, headers, config) {
            console.log("bosta");
        });
});

mainApp.controller("recursosDetailController", function ($scope, $http, $routeParams, ngToast) {

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
                    ngToast.create('Gravado com sucesso');
                }).
                error(function (data) {

                });
        }
    };
});

mainApp.controller("criarRecursosController", function ($scope, $http) {
    $scope.empData = {};
    $scope.empData.nivel = "Escolher nível";
    $scope.niveis = niveis;

    $scope.gravar = function () {
        if($scope.criarForm.$valid && $scope.empData.nivel != "Escolher nível"){
            $http.post('/recursos/recursos', $scope.empData, {}).
                success(function () {
                    ngToast.create('Gravado com sucesso');
                }).
                error();
        }
        else{
            ngToast.create('Escolher nível');
        }
    };

    $scope.dropSelected = function (item) {
        $scope.empData.nivel = item;
    };
});