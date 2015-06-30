describe('Test usersDetailController', function() {

    var $controller,
        $scope;

    beforeEach(
        angular.mock.module("mainApp")
    );

    beforeEach(angular.mock.inject(function ($rootScope, _$controller_) {
        $scope = $rootScope.$new();
        var _UserServices_ = {};
        _UserServices_.getUserForId = function(id, callback){
            callback({"name":"Joao Guilherme Sousa", "email":"sousa@sousa.com"});
        };
        $controller = _$controller_('usersDetailController', {
            $scope: $scope,
            UserServices:_UserServices_
        });
    }));

    it ('User determined', function () {
        expect($scope.userData).toBeDefined();
    });

});