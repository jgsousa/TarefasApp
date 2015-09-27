mainApp.controller('spinnerController',[ '$scope', '$modalInstance',
    function($scope,$modalInstance){
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);