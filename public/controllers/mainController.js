mainApp.controller("mainController", function($scope, $http){

    var dados = [ { key:"Sim", y:0 } , { key:"Não", y:0 }];

    $scope.pieOptions = {
        chart: {
            type: 'pieChart',
            height: 400,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: true,
            labelThreshold: 0.01,
            legend: {
                margin: {
                    top: 5,
                    right: 35,
                    bottom: 5,
                    left: 0
                }
            }
        }
    };

    $scope.barOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 400,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showValues: true,
            valueFormat: function(d){
                return d3.format('1d')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Atribuído?'
            },
            yAxis: {
                axisLabel: 'Nº recursos',
                axisLabelDistance: 30
            }
        }
    };

    var getRecursos = function (data, status, headers, config) {

        for(var i = 0; i < data.length; i++){
            if(data[i].tem.tarefa === "Sim"){
                dados[0].y = dados[0].y + 1;
            }else{
                dados[1].y = dados[1].y + 1;
            }
        }
        $scope.data = dados;
        $scope.data2 = [ { key : "Cumulative", values: dados } ];
    };

    $http.get('/recursos/recursos').
        success(getRecursos).
        error(function (data, status, headers, config) {
            console.log("bosta");
        });



});