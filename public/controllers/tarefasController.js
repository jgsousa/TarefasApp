var projectos = [
    "NDAD",
    "Non-chargable"
];

var estados = [
    "Aberta",
    "Fechada"
];

mainApp.controller("tarefasDetailController", function ($scope, $http, $routeParams, ngToast,
                                                        $location, EmployeeServices) {

    $scope.projectos = projectos;
    $scope.estados = estados;
    $scope.tarefaData = {};
    if ($routeParams.tarefa) {
        $scope.titulo = "Detalhe tarefa";
        EmployeeServices.getEmployeeForId($routeParams.id, function (data) {
            for (var i = 0; i < data.tarefas.length; i++) {
                var t = data.tarefas[i];
                if (t._id == $routeParams.tarefa) {
                    $scope.tarefaData = t;
                    $scope.tarefaData.dataInicio = new Date($scope.tarefaData.dataInicio);
                    $scope.tarefaData.dataFim = new Date($scope.tarefaData.dataFim);
                }
            }
        },function (data, status, headers, config) {
            console.log("bosta");
        });
    }
    else {
        $scope.tarefaData = {};
        $scope.titulo = "Criar tarefa";
        $scope.tarefaData.dataInicio = new Date();
        $scope.tarefaData.projecto = "Escolher projecto";
    }
    if (!$scope.tarefaData.status) {
        $scope.tarefaData.status = "Aberta";
    }

    $scope.dropSelected = function (projecto) {
        $scope.tarefaData.projecto = projecto;
    };

    $scope.estadoSelected = function(estado){
      $scope.tarefaData.status = estado;
    };

    $scope.gravar = function () {
        EmployeeServices.createTarefaForEmployee($routeParams.id, function () {
            $location.path('/recursos/' + $routeParams.id);
        }, function () {

        });
    };
});