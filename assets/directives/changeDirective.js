mainApp.directive('inputOnChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.inputOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});