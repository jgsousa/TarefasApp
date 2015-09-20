describe('Test usersDetailController', function () {

    var $controller,
        $scope,
        mockUserService,
        $q,
        $rootScope,
        $location,
        deferred;

    beforeEach(
        angular.mock.module("mainApp", function ($provide) {
            mockUserService = {
                getUserForId: function (id) {
                    deferred = $q.defer();
                    return deferred.promise;
                }
            };
            $provide.value("UserServices", mockUserService);
        })
    );

    beforeEach(angular.mock.inject(function (_$rootScope_, _$controller_, _$q_, _$location_) {
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $q = _$q_;
        $location = _$location_;
        spyOn($location,'path');
        $controller = _$controller_('usersDetailController', {
            $scope: $scope
        });
    }));

    it('User is returned and userData is set', function () {
        deferred.resolve({"name": "Joao Guilherme Sousa", "email": "sousa@sousa.com"});
        $rootScope.$apply();
        expect($scope.userData).toBeDefined();
        expect($scope.userData.name).toEqual("Joao Guilherme Sousa");
    });


    it("Redirected if user doesn't exist", function () {
        deferred.resolve(undefined);
        $rootScope.$apply();
        expect($location.path).toHaveBeenCalledWith('/users/');
    });

});