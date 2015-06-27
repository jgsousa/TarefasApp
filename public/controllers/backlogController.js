mainApp.controller('backlogController', function ($scope, BacklogServices) {

    var columnDefs = [
        {headerName: "Nível", field: "nivel", width: 120},
        {headerName: "Recurso", field: "recurso"},
        {headerName: "Rate", field: "rate", width: 70}
    ];

    var valueHandler = function (params) {
        var row = $scope.gridOptions.rowData[params.rowIndex];
        row[params.colDef.field] = params.newValue;
        console.log(row);
        console.log(params.colDef);
        BacklogServices.updateProjecto(params.colDef.projectId, params.newValue,"201506", row.recursoid);
    };

    $scope.gridOptions = {
        columnDefs: columnDefs,
        showToolPanel: true,
        enableSorting: true,
        enableColResize: true,
        dontUseScrolls: true // because so little data, no need to use scroll bars
    };

    $scope.gridOptions.ready = function () {
        BacklogServices.getBacklogColumnDefs(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].width = 120;
                data[i].editable = true;
                data[i].newValueHandler = valueHandler;
                columnDefs.push(data[i]);
            }
            $scope.gridOptions.columnDefs = columnDefs;
            $scope.gridOptions.api.onNewCols();
        });
    };

    BacklogServices.getBacklogData("", function (data) {
        console.log(JSON.stringify(data));
        $scope.gridOptions.rowData = data;
        $scope.gridOptions.api.onNewRows();
    });
});