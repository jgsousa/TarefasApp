mainApp.controller('backlogController', ['$scope', 'BacklogServices', 'uiGridGroupingConstants', 'uiGridConstants',
    'BudgetServices', 'ModalServices', 'FileServices', 'ngToast',
    function ($scope, BacklogServices, uiGridGroupingConstants, uiGridConstants, BudgetServices,
              ModalServices, FileServices, ngToast) {

        var niveis = [ "Partner", "Associate Partner", "Senior Manager", "Manager", "Senior Consultant", "Consultant", "Analyst"];
        var sorter = function(a,b){
            var indexA = niveis.indexOf(a.nivel);
            var indexB = niveis.indexOf(b.nivel);
            return ( indexA - indexB );
        };

        $scope.meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        $scope.anos = ['2015','2016', '2017'];

        var today = new Date();
        var m = today.getMonth();
        var yyyy = today.getFullYear().toString();


        $scope.backlogData = {};
        $scope.backlogData.mes = $scope.meses[m];
        $scope.backlogData.ano = yyyy;

        $scope.gridOptions = {
            showColumnFooter: true,
            enableSorting: false,
            columnDefs: [
                {field: 'nivel', headerCellClass: 'blue', width: 150, pinnedLeft: true, grouping: {groupPriority: 0}},
                {field: 'recurso', headerCellClass: 'blue', width: 150, pinnedLeft: true, enableFilter:true},
                {field: 'horas', headerCellClass: 'blue', width:70, pinnedLeft: true,
                    cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                        var value = grid.getCellValue(row, col);
                        if (value != undefined) {
                            if (grid.getCellValue(row, col) > 100) {
                                return 'green';
                            } else {
                                return 'red';
                            }
                        }
                    }},
                {field: 'rate', headerCellClass: 'blue', width: 70 }
            ],
            enableGridMenu: true,
            exporterCsvFilename: 'myFile.csv',
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location"))
        };

        $scope.getPeriodo = function(){
            var m = $scope.meses.indexOf($scope.backlogData.mes) + 1;
            if (m < 10){
                m = '0' + m;
            }
            return $scope.backlogData.ano.concat(m);
        };

        BacklogServices.getBacklogColumnDefs().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].displayName = data[i].field;
                data[i].projectId = data[i].projectId;
                data[i].width = 120;
                data[i].displayName = data[i].field;
                data[i].headerCellClass = 'blue';
                data[i].enableCellEdit = true;
                data[i].treeAggregationType = uiGridGroupingConstants.aggregation.sum;
                data[i].footerCellTemplate = '<div class="ui-grid-cell-contents">' +
                    '{{grid.appScope.' + data[i].field + '}} €</div>';
                $scope.gridOptions.columnDefs.push(data[i]);
            }
        });

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            $scope.msg = {};
            var changeSet = {};
            gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {

                BacklogServices.updateProjecto(colDef.projectId, newValue, $scope.getPeriodo(), rowEntity.recursoid);

                var dif = newValue - oldValue;
                rowEntity.horas = rowEntity.horas + dif;
                changeSet[rowEntity.$$hashKey] = changeSet[rowEntity.$$hashKey] || [];
                changeSet[rowEntity.$$hashKey].push('horas'.split('.')[0]);
                rowEntity.changed = changeSet;
                gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                $scope.$apply();
                $scope.actualizarTotais();
                $scope.budgetData.percentagem = $scope.getPercentagem();
            });
        };

        $scope.actualizarTotais = function(){
            $scope.gridOptions.columnDefs.forEach(function (column, index) {
                $scope[column.field] = 0;
                if (column.field != 'nivel' && column.field != 'horas' && column.field != 'rate'
                    && column.field != 'recurso') {

                    $scope.gridOptions.data.forEach(function (element, index) {
                        $scope[column.field] = $scope[column.field] + element[column.field] * element.rate;
                    });
                }
            });
        };

        $scope.getPercentagem = function(){
            var resultado = 0;
            $scope.gridOptions.columnDefs.forEach(function (column, index) {
                if (column.field != 'nivel' && column.field != 'horas' && column.field != 'rate'
                    && column.field != 'recurso') {

                    $scope.gridOptions.data.forEach(function (element, index) {
                        resultado = resultado + element[column.field] * element.rate;
                    });
                }
            });
            if ($scope.budgetData) {
                return Math.round(resultado / $scope.budgetData.valor * 100);
            } else {
                return 0;
            }
        };

        $scope.uploadBacklog = function(){
            var file = event.target.files[0];
            var openXLS = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (file.type.match(openXLS)){
                var reader = new FileReader();

                reader.onload = function (e) {
                    var backlog = FileServices.XLSXToArray(reader.result);
                    $scope.spin.close();
                    var processed = BacklogServices.processFile(backlog);
                    ModalServices.popUpToConfirm("Confirmar o carregamento?").
                        result.then(function () {
                            BacklogServices.updateBacklog($scope.getPeriodo(), processed)
                                .then(function(){
                                    BacklogServices.getBacklogData($scope.getPeriodo()).then(function (data) {
                                        $scope.gridOptions.data = data.sort(sorter);
                                        $scope.actualizarTotais();
                                        if ($scope.budgetData){
                                            $scope.budgetData.percentagem = $scope.getPercentagem();
                                        }
                                        ngToast.create('Carregado com sucesso');
                                    });
                                });
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

        BudgetServices.getBudgetForId($scope.getPeriodo(), function (data) {
            $scope.budgetData = {};
            if (data.valor){
                $scope.budgetData.valor = data.valor;
                $scope.budgetData.horas = data.horas;
            } else {
                $scope.budgetData.valor = 0;
                $scope.budgetData.horas = 0;
            }

        }, function(err){

        });

        BacklogServices.getBacklogData($scope.getPeriodo()).then(function (data) {
            $scope.gridOptions.data = data.sort(sorter);
            $scope.actualizarTotais();
            if ($scope.budgetData){
                $scope.budgetData.percentagem = $scope.getPercentagem();
            }
        });

        $scope.mesSelected = function(mes){
            $scope.backlogData.mes = mes;
            BacklogServices.getBacklogData($scope.getPeriodo()).then(function (data) {
                $scope.gridOptions.data = data.sort(sorter);
                $scope.actualizarTotais();
                $scope.budgetData.percentagem = $scope.getPercentagem();
            });
        };

        $scope.anoSelected = function(ano){
            $scope.backlogData.ano = ano;
            BacklogServices.getBacklogData($scope.getPeriodo(), function (data) {
                $scope.gridOptions.data = data.sort(sorter);
                $scope.actualizarTotais();
                $scope.budgetData.percentagem = $scope.getPercentagem();
            });
        };

    }]);