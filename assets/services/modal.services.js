mainApp.service('ModalServices', ['$modal', function ($modal) {
    this.showSpinner = function(){
        return $modal.open({
            animation: true,
            templateUrl: '/modals/spinner.html',
            controller: 'spinnerController',
            size: 'm',
            backdrop:'static',
            keyboard:'false'
        });
    };

    this.showFileValidation = function(data){
        return $modal.open({
            animation: true,
            templateUrl: '/modals/confirmFile.html',
            controller: 'confirmFileController',
            size: 'l',
            resolve: {
                elements: function () {
                    return data;
                }
            }
        });
    };
}]);