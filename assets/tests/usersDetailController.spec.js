describe('Test usersDetailController', function() {

    var localController,
        scope;

    beforeEach(
        angular.mock.module("mainApp")
    );

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        var _UserServices_ = {};
        _UserServices_.getUserForId = function(id, callback){
            callback({"name":"Joao Guilherme Sousa", "email":"sousa@sousa.com"});
        };
        localController = $controller('usersDetailController', {
            $scope: scope,
            UserServices:_UserServices_
        });
    }));

    it ('User determined', function () {
        expect(scope.userData).toBeDefined();
    });

});