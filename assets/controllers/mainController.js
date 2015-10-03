mainApp.controller("mainController", ['$scope', '$http', 'ProjectoServices', 'EmployeeServices',
    function ($scope, $http, ProjectoServices, EmployeeServices) {

        var colors = ['#9ACD66', '#18d3ff','#00A1DE', '#72C7E7','#3C8A2E', '#BDD203'];
        var dados = [{key: "Alocado", y: 0}, {key: "Livre", y: 0}];

        $scope.pieOptions = {
            chart: {
                color:colors,
                type: 'pieChart',
                height: 350,
                x: function (d) {
                    return d.key;
                },
                y: function (d) {
                    return d.y;
                },
                showLabels: true,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    },
                    padding: {
                        left: 10,
                        right: 10
                    }
                }
            }
        };

        $scope.barOptions = {
            chart: {
                color:colors,
                type: 'discreteBarChart',
                height: 350,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function (d) {
                    return d.key;
                },
                y: function (d) {
                    return d.y;
                },
                showValues: true,
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Projecto'
                },
                yAxis: {
                    axisLabel: 'Nº recursos',
                    axisLabelDistance: 30
                }
            }
        };

        $scope.pieOptionsFee = {
            chart: {
                color:colors,
                type: 'pieChart',
                height: 350,
                x: function (d) {
                    return d.codigo;
                },
                y: function (d) {
                    return d.valor;
                },
                showLabels: false,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    },
                    padding: {
                        left: 10,
                        right: 10
                    }
                }
            }
        };

        $scope.barOptions2 = {
            chart: {
                color:colors,
                type: 'discreteBarChart',
                height: 350,
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function (d) {
                    return d.codigo;
                },
                y: function (d) {
                    return d.valor;
                },
                showValues: true,
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Projecto'
                },
                yAxis: {
                    axisLabel: 'Nº recursos',
                    axisLabelDistance: 30
                }
            }
        };

        var getRecursos = function (data, status, headers, config) {

            for (var i = 0; i < data.length; i++) {
                if (data[i].tem.tarefa === "Sim") {
                    dados[0].y = dados[0].y + 1;
                } else {
                    dados[1].y = dados[1].y + 1;
                }
            }
            $scope.data = dados;
            //$scope.data2 = [{key: "Cumulative", values: dados}];
        };

        $http.get('/recursos/recursos').
            success(getRecursos).
            error(function (data, status, headers, config) {

            });

        var searchDados = function (codigo, array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].key == codigo) {
                    return array[i];
                }
            }
            return undefined;
        };

        $http.get('/recursos/tarefas').
            success(function (data) {
                var dados = [];
                var novo;
                for (var i = 0; i < data.length; i++) {
                    novo = searchDados(data[i].projecto, dados);
                    if (!novo) {
                        novo = {};
                        novo.key = data[i].projecto;
                        novo.y = 1;
                        dados.push(novo);
                    } else {
                        novo.y = novo.y + 1;
                    }
                }
                //$scope.data = dados;
                $scope.data2 = [{key: "Cumulative", values: dados}];
            }).error(function (err) {

            });
        EmployeeServices.getAllEmployees().then(ProjectoServices.getNetFeesForEmpregados)
            .then(function(data){
                var today = new Date();
                var m = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                var periodo;
                $scope.periodo = yyyy + '/' + m;
                if (m < 10){
                    periodo = yyyy + '0' + m;

                } else {
                    periodo = yyyy + m;
                }
                var dadosPeriodo = data[periodo];
                if (dadosPeriodo) {
                    var feeProj = dadosPeriodo.projectos;
                    $scope.feeProj = $.map(feeProj, function (value, index) {
                        return [value];
                    });
                    $scope.feeProj2 = [{key: "Cumulative", values: $scope.feeProj}];
                } else {
                    $scope.feeProj = [];
                    $scope.feeProj2 = [{key: "Cumulative", values: $scope.feeProj}];
                }
            });
    }]);