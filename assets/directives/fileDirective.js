mainApp.directive('fileTable', function() {
    return {
        restrict: 'E',
        scope: {
            tableData: '=dados',
            keys: '=keys'
        },
        template: function(elem, attr){
            var html1 = "<table class=\"table\">" +
                "<thead>" +
                "<tr>" +
                "<th ng-repeat=\"key in keys\">{{key}}</th>" +
                "</tr>" +
                "</thead>" +
                "<tbody>" +
                "<tr ng-repeat=\"element in tableData\">" +
                    "<td ng-repeat=\"key in keys\">{{element[key]}}</td>" +
                "</tr>" +
                "</tbody>" +
                "</table>";

            var html2 = "<div>Teste</div>";
            return html1;

        }
    };
});