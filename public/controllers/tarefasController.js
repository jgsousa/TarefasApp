mainApp.controller("tarefasDetailController", function ($scope, $routeParams, ngToast,
                                                        $location, EmployeeServices, ProjectoServices) {

    var estados = [
        "Aberta",
        "Fechada"
    ];

    ProjectoServices.getAllProjectos(function(data){
        var projectos = [];
        projectos.push( "Non-chargable");
        for(var i = 0; i < data.length; i++){
            projectos.push( data[i].codigo );
        }
        $scope.projectos = projectos;
    }, function(err){

    });

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
        if(!$routeParams.tarefa) {
            EmployeeServices.createTarefaForEmployee($routeParams.id, $scope.tarefaData,function () {
                $location.path('/recursos/' + $routeParams.id);
            }, function () {

            });
        }
        else{
            EmployeeServices.updateTarefaForEmployee($routeParams.id, $scope.tarefaData, function(){

            });
        }
    };
});