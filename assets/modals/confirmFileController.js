mainApp.controller('confirmFileController', ['$scope', '$modalInstance', 'elements',
    function ($scope, $modalInstance, elements) {

        $scope.elements = elements;
        $scope.element = $scope.elements[0];
        $scope.keys = Object.keys($scope.element);

        $scope.ok = function () {
            $modalInstance.close('ok');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);