describe('Test usersController', function() {

    var $controller, $scope,
        users = [
            {_id:"123","name":"Joao Guilherme Sousa", "email":"sousa@sousa.com"},
            {_id:"456","name":"Testes unitarios", "email":"teste@teste.com"}
        ];

    beforeEach(
        angular.mock.module("mainApp")
    );

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        var _UserServices_ = {};
        _UserServices_.getAllUsers = function(callback){
            callback(users);
        };
        _UserServices_.deleteUser = function(id, callback){
            callback({});
        };

        $controller = _$controller_('usersController', {
            $scope: $scope,
            UserServices:_UserServices_
        });
    }));

    it ('Correct number of users assigned', function () {
        expect($scope.users.length).toEqual(2);
    });

    it('Delete one user, reduces scope size', function(){
        var user = users[0];
        $scope.confirmDeletion(user);
        expect($scope.users.length).toEqual(1);
        expect($scope.users[0]._id).toEqual("456");
    });

});