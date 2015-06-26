var niveis = [
    "Partner",
    "AP",
    "Senior Manager",
    "Manager",
    "Senior Consultant",
    "Consultant",
    "Analista"
];

mainApp.controller("recursosController", function ($scope, $http, $filter, EmployeeServices) {

    EmployeeServices.getAllEmployees(function (data) {
        $scope.empregados = data;
    },function (data) {
        console.log("bosta");
    });

    $scope.sortNome = function () {
        $scope.empregados = $filter('orderBy')($scope.empregados, "name");
    };
    $scope.sortNivel = function () {
        $scope.empregados = $filter('orderBy')($scope.empregados, "nivel");
    }
});

mainApp.controller("recursosDetailController", function ($scope, $http, $routeParams, ngToast, $location, EmployeeServices) {

    $scope.niveis = niveis;

    EmployeeServices.getEmployeeForId($routeParams.id, function (data) {
        $scope.empData = data;
    }, function (data) {
        console.log("bosta");
    });

    $scope.gravar = function () {

        if ($scope.modificarForm.$valid) {
            EmployeeServices.updateEmployee($routeParams.id, $scope.empData,function (data) {
                $location.path('/recursos');
            },function (data) {

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

mainApp.controller("criarRecursosController", function ($scope, $http, ngToast, $location, EmployeeServices) {
    $scope.empData = {};
    $scope.empData.nivel = "Escolher nível";
    $scope.niveis = niveis;

    $scope.gravar = function () {
        if ($scope.criarForm.$valid && $scope.empData.nivel != "Escolher nível") {
            EmployeeServices.createEmployee($scope.empData,function () {
                $location.path('/recursos');
            });
        }
        else {
            ngToast.create('Escolher nível');
        }
    };

    $scope.dropSelected = function (item) {
        $scope.empData.nivel = item;
    };
});