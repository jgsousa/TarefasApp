mainApp.controller("projectosController", function ($scope, $modal, ProjectoServices) {

    ProjectoServices.getAllProjectos(function (data) {
        $scope.projectos = data;
    }, function (data, status, headers, config) {
        console.log("bosta");
    });

});

mainApp.controller("projectosDetailController", function ($scope, $routeParams, ProjectoServices, $location) {
    $scope.estados = ["Aberto", "Fechado"];
    if ($routeParams.id) {
        $scope.titulo = "Detalhe de projecto"
        ProjectoServices.getProjectoForId($routeParams.id, function (data) {
            $scope.projData = data;
            $scope.projData.dataInicio = new Date($scope.projData.dataInicio);
            $scope.projData.dataFim = new Date($scope.projData.dataFim);
        }, function (data, status, headers, config) {
            console.log("bosta");
        });
    }
    else {
        $scope.titulo = "Criar projecto";
        $scope.projData = {};
        $scope.projData.estado = "Aberto";
    }

    $scope.estadoSelected = function(estado){
        $scope.projData.estado = estado;
    };

    $scope.gravar = function(){
        if($routeParams.id){
            ProjectoServices.updateProjecto($routeParams.id, $scope.projData, function(){
               $location.path('/projectos/');
            });
        }
        else {
            ProjectoServices.createProjecto($scope.projData, function () {
                $location.path('/projectos/');
            });
        }
    }
});