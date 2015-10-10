mainApp.controller("tarefasDetailController", ['$scope', '$routeParams', 'ngToast', '$location',
    'EmployeeServices', 'ProjectoServices',
    function ($scope, $routeParams, ngToast, $location, EmployeeServices, ProjectoServices) {

        var estados = [
            "Aberta",
            "Fechada"
        ];

        ProjectoServices.getAllProjectos().then(function (data) {
            var projectos = [];
            projectos.push("Non-chargable");
            for (var i = 0; i < data.length; i++) {
                projectos.push(data[i].codigo);
            }
            $scope.projectos = projectos;
        });

        $scope.estados = estados;
        $scope.tarefaData = {};
        if ($routeParams.tarefa) {
            $scope.titulo = "Detalhe tarefa";
            EmployeeServices.getEmployeeForId($routeParams.id).then(function (data) {
                for (var i = 0; i < data.tarefas.length; i++) {
                    var t = data.tarefas[i];
                    if (t._id == $routeParams.tarefa) {
                        $scope.tarefaData = t;
                        $scope.tarefaData.dataInicio = new Date($scope.tarefaData.dataInicio);
                        $scope.tarefaData.dataFim = new Date($scope.tarefaData.dataFim);
                    }
                }
            });
        } else {
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

        $scope.estadoSelected = function (estado) {
            $scope.tarefaData.status = estado;
        };

        $scope.gravar = function () {
            if (!$routeParams.tarefa) {
                EmployeeServices.createTarefaForEmployee($routeParams.id, $scope.tarefaData).then(function () {
                    $location.path('/recursos/' + $routeParams.id);
                });
            } else {
                EmployeeServices.updateTarefaForEmployee($routeParams.id, $scope.tarefaData).then(function () {
                    $location.path('/recursos/' + $routeParams.id);
                });
            }
        };
    }]);