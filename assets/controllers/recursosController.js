var niveis = [
    "Partner",
    "AP",
    "Senior Manager",
    "Manager",
    "Senior Consultant",
    "Consultant",
    "Analista"
];

mainApp.controller("recursosController", ['$scope', '$filter', 'EmployeeServices',
    function ($scope, $filter, EmployeeServices) {

        EmployeeServices.getAllEmployees(function (data) {
            $scope.empregados = data;
        }, function (data) {

        });

        $scope.sortNome = function () {
            $scope.empregados = $filter('orderBy')($scope.empregados, "name");
        };
        $scope.sortNivel = function () {
            $scope.empregados = $filter('orderBy')($scope.empregados, "nivel");
        };

        $scope.soLivresChanged = function () {
            if (!$scope.filtro){
                $scope.filtro = {};
            }
            $scope.filtro.tarefa = {};
            if ($scope.soLivres) {
                $scope.filtro.tarefa.actual = "!";
            } else {
                $scope.filtro.tarefa.actual = undefined;
            }
        };
    }]);

mainApp.controller("recursosDetailController", ['$scope', '$routeParams', 'ngToast', '$location', 'EmployeeServices',
    function ($scope, $routeParams, ngToast, $location, EmployeeServices) {

        $scope.niveis = niveis;

        EmployeeServices.getEmployeeForId($routeParams.id, function (data) {
            $scope.empData = data;
        }, function (data) {

        });

        $scope.gravar = function () {

            if ($scope.modificarForm.$valid) {
                EmployeeServices.updateEmployee($routeParams.id, $scope.empData, function (data) {
                    $location.path('/recursos');
                }, function (data) {

                });
            }
        };

        $scope.adicionar = function () {
            $location.path('/recursos/' + $routeParams.id + '/novatarefa');
        };

        $scope.navegarTarefa = function (tarefa) {
            $location.path('/recursos/' + $routeParams.id + '/tarefa/' + tarefa._id);
        };
    }]);

mainApp.controller("criarRecursosController", ['$scope', 'ngToast', '$location', 'EmployeeServices',
    function ($scope, ngToast, $location, EmployeeServices) {
        $scope.empData = {};
        $scope.empData.nivel = "Escolher nível";
        $scope.niveis = niveis;

        $scope.gravar = function () {
            if ($scope.criarForm.$valid && $scope.empData.nivel != "Escolher nível") {
                EmployeeServices.createEmployee($scope.empData, function () {
                    $location.path('/recursos');
                });
            } else {
                ngToast.create('Escolher nível');
            }
        };

        $scope.dropSelected = function (item) {
            $scope.empData.nivel = item;
        };
    }]);