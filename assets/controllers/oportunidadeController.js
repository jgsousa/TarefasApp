mainApp.controller("oportunidadeController", ['$scope', '$modal', 'OportunidadeServices', '$filter',
    function ($scope, $modal, OportunidadeServices, $filter) {
        $scope.filtro = {};
        $scope.filtro.estado = 'Aberto';

        var actualizarProb = function(){
            $scope.t25 = 0; $scope.t50 = 0; $scope.t75 = 0; $scope.t100 = 0;
            $scope.oportunidades.forEach(function(element){
                element.p25 = 0; element.p50 = 0; element.p75 = 0; element.p100 = 0;
                if (element.probabilidade < 25){
                    element.p25 = element.p25 + element.valor;
                    $scope.t25 = $scope.t25 + element.valor;
                } else if (element.probabilidade < 50){
                    element.p50 = element.p50 + element.valor;
                    $scope.t50 = $scope.t50 + element.valor;
                } else if (element.probabilidade < 75){
                    element.p75 = element.p75 + element.valor;
                    $scope.t75 = $scope.t75 + element.valor;
                } else {
                    element.p100 = element.p100 + element.valor;
                    $scope.t100 = $scope.t100 + element.valor;
                }
            });
        };

        OportunidadeServices.getAllOportunidades().then(function (data) {
            $scope.oportunidades = data;
            actualizarProb();
        });

        $scope.sortCliente = function () {
            $scope.oportunidades = $filter('orderBy')($scope.oportunidades, "cliente");
        };
        $scope.sortDescritivo = function () {
            $scope.oportunidades = $filter('orderBy')($scope.oportunidades, "descritivo");
        };

        $scope.soAbertosChanged = function () {
            if (!$scope.filtro){
                $scope.filtro = {};
            }

            if ($scope.mostraFechados) {
                $scope.filtro.estado = undefined;
            } else {
                $scope.filtro.estado = 'Aberto';
            }
        };

    }]);

mainApp.controller("oportunidadeDetailController", ['$scope', '$routeParams', 'OportunidadeServices', '$location',
    function ($scope, $routeParams, OportunidadeServices, $location) {

        $scope.estados = ["Aberto", "Fechado"];
        if ($routeParams.id) {
            $scope.titulo = "Detalhe de oportunidade";
            OportunidadeServices.getOportunidadeForId($routeParams.id).then(function (data) {
                $scope.opData = data;
            });
        } else {
            $scope.titulo = "Criar oportunidade";
            $scope.opData = {};
            $scope.opData.estado = "Aberto";
        }

        $scope.estadoSelected = function(estado){
            $scope.opData.estado = estado;
        };

        $scope.gravar = function(){
            if ($routeParams.id){
                OportunidadeServices.updateOportunidade($routeParams.id, $scope.opData).then(function(){
                    $location.path('/oportunidades/');
                });
            } else {
                OportunidadeServices.createOportunidade($scope.opData).then(function () {
                    $location.path('/oportunidades/');
                });
            }
        };
    }]);