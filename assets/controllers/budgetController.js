mainApp.controller('budgetController', ['$scope', 'BudgetServices',
    function ($scope, BudgetServices) {


        $scope.meses = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        $scope.anos = ['2015', '2016', '2017'];

        $scope.gridOptions = {
            showColumnFooter: true,
            enableSorting: false,
            columnDefs: [
                {field: 'periodo', headerCellClass: 'blue', width: 150, pinnedLeft: true },
                {field: 'valor', headerCellClass: 'blue', width: 150, pinnedLeft: true },
                {field: 'horas', headerCellClass: 'blue', width: 150, pinnedLeft: true}
            ]
        };

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            $scope.msg = {};
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                if (rowEntity._id){
                    BudgetServices.updateBudget(rowEntity._id, rowEntity, function(){

                    });
                } else {
                    BudgetServices.createBudget(rowEntity, function(data){
                        rowEntity._id = data._id;
                    });
                }
                $scope.$apply();
            });
        };


        BudgetServices.getAllBudgets(function (data) {
            var dados = [{ periodo: "201501", valor:0, horas:0 },
                { periodo: "201501", valor:0, horas:0 },
                { periodo: "201502", valor:0, horas:0 },
                { periodo: "201503", valor:0, horas:0 },
                { periodo: "201504", valor:0, horas:0 },
                { periodo: "201505", valor:0, horas:0 },
                { periodo: "201506", valor:0, horas:0 },
                { periodo: "201507", valor:0, horas:0 },
                { periodo: "201508", valor:0, horas:0 },
                { periodo: "201509", valor:0, horas:0 },
                { periodo: "201510", valor:0, horas:0 },
                { periodo: "201511", valor:0, horas:0 },
                { periodo: "201512", valor:0, horas:0 },
                { periodo: "201601", valor:0, horas:0 },
                { periodo: "201602", valor:0, horas:0 },
                { periodo: "201603", valor:0, horas:0 },
                { periodo: "201604", valor:0, horas:0 },
                { periodo: "201605", valor:0, horas:0 },
                { periodo: "201606", valor:0, horas:0 },
                { periodo: "201607", valor:0, horas:0 },
                { periodo: "201608", valor:0, horas:0 }];
            dados.forEach(function(per){
                data.forEach(function(dados){
                    if (per.periodo == dados.periodo){
                        per.valor = dados.valor;
                        per.horas = dados.horas;
                        per._id = dados._id;
                    }
                });
            });
            $scope.gridOptions.data = dados;
        }, function(err){

        });
    }]
);