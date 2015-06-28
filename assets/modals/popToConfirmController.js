mainApp.controller('popToConfirmController', ['$scope', '$modalInstance', 'texto',
    function ($scope, $modalInstance, texto) {

    $scope.mensagem = texto;

    $scope.ok = function () {
        $modalInstance.close('ok');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);