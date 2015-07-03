describe('Test usersController', function() {

    var $controller, $scope,
        users = [
            {_id:"123","name":"Joao Guilherme Sousa", "email":"sousa@sousa.com"},
            {_id:"456","name":"Testes unitarios", "email":"teste@teste.com"}
        ],
        deferredAll,
        deferredDel,
        deferredModal,
        mockUserService,
        $q,
        $rootScope,
        $modal;

    beforeEach(
        angular.mock.module("mainApp", function ($provide) {
            mockUserService = {
                getAllUsers: function () {
                    deferredAll = $q.defer();
                    return deferredAll.promise;
                },
                deleteUser: function(id){
                    deferredDel = $q.defer();
                    return deferredDel.promise;
                }
            };
            $provide.value("UserServices", mockUserService);
        })
    );

    beforeEach(inject(function (_$rootScope_, _$controller_, _$modal_, _$q_) {
        $scope = _$rootScope_.$new();
        $q = _$q_;
        $modal = _$modal_;
        $rootScope = _$rootScope_;

        $controller = _$controller_('usersController', {
            $scope: $scope,
            Userservice: mockUserService
        });
    }));

    it ('Correct number of users assigned', function () {
        deferredAll.resolve(users);
        $rootScope.$apply();
        expect($scope.users.length).toEqual(2);
    });

    it('Delete one user, reduces scope size', function(){
        deferredAll.resolve(users);
        deferredModal = $q.defer();
        spyOn($modal, 'open').and.returnValue({ result: deferredModal.promise });
        $scope.requestDeleteSelected(users[0]);
        spyOn(mockUserService,'deleteUser');
        expect(mockUserService.deleteUser).not.toHaveBeenCalled();
        deferredModal.resolve("1000");

        $rootScope.$apply();
        expect($modal.open).toHaveBeenCalled();
        expect(mockUserService.deleteUser).toHaveBeenCalled();
        expect($scope.users.length).toEqual(1);
    });

});