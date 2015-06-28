mainApp.controller('backlogController', function ($scope, BacklogServices) {

    var niveis = [ "Partner", "AP", "Senior Manager", "Manager", "Senior Consultant", "Consultant", "Analista"];
    var columnDefs = [
        {headerName: "Nível", field: "nivel", width: 120},
        {headerName: "Recurso", field: "recurso"},
        {headerName: "Rate", field: "rate", width: 70}
    ];

    var valueHandler = function (params) {
        var row = $scope.gridOptions.rowData[params.rowIndex];
        row[params.colDef.field] = params.newValue;
        BacklogServices.updateProjecto(params.colDef.projectId, params.newValue,"201506", row.recursoid);
    };

    var sorter = function(a,b){
        if(a.recurso == "Joao Paulo Domingos"){
            console.log(b);
        }
        var indexA = niveis.indexOf(a.nivel);
        var indexB = niveis.indexOf(b.nivel);
        if(a.recurso == "Joao Paulo Domingos"){
            console.log(indexA);
            console.log(indexB);
        }
        return ( indexA - indexB );
    };

    $scope.gridOptions = {
        columnDefs: columnDefs,
        showToolPanel: true,
        enableColResize: true,
        dontUseScrolls:false
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
        data.sort(sorter);
        $scope.gridOptions.rowData = data;
        $scope.gridOptions.api.onNewRows();
    });
});