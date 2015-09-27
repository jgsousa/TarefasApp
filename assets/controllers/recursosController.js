var niveis = [
    "Partner",
    "AP",
    "Senior Manager",
    "Manager",
    "Senior Consultant",
    "Consultant",
    "Analista"
];

mainApp.controller("recursosController", ['$scope', '$filter', 'EmployeeServices','FileServices', '$modal', 'ModalServices',
    function ($scope, $filter, EmployeeServices, FileServices, $modal, ModalServices) {

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
            if (!$scope.filtro) {
                $scope.filtro = {};
            }
            $scope.filtro.tarefa = {};
            if ($scope.soLivres) {
                $scope.filtro.tarefa.actual = "!";
            } else {
                $scope.filtro.tarefa.actual = undefined;
            }
        };

        $scope.uploadFile = function(event){
            var file = event.target.files[0];
            var textType = /text.*/;
            var csvType = 'application/vnd.ms-excel';
            var openXLS = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (file.type.match(textType) || file.type.match(csvType)) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var dataArray;

                    dataArray = FileServices.CSVToArray(reader.result);
                    var employees = EmployeeServices.recursosFromArray(dataArray);
                    ModalServices.showFileValidation(employees).
                        result.then(function () {
                            return EmployeeServices.updateFromArray(employees);
                        });
                };

                reader.readAsText(file);
            } else if (file.type.match(openXLS)){
                var reader = new FileReader();

                reader.onload = function (e) {
                    var employees = FileServices.XLSXToArray(reader.result);
                    $scope.spin.close();
                    ModalServices.showFileValidation(employees).
                        result.then(function () {
                            return EmployeeServices.updateFromArray(employees);
                        });
                };
                $scope.spin = ModalServices.showSpinner();
                $scope.spin.opened.then(function(){
                    reader.readAsBinaryString(file);
                });
            } else {
                $scope.textoLido = "File not supported!";
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