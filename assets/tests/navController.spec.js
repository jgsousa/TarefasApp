describe('Test navController', function() {

    var localController,
        scope;

    beforeEach(
        angular.mock.module("mainApp")
    );

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        localController = $controller('navController', {
            $scope: scope
        });
    }));

    it ('Correct navigation options', function () {
        expect(scope.funcao1).toEqual("Utilizadores");
        expect(scope.funcao2).toEqual("Backlog");
        expect(scope.funcao3).toEqual("Recursos");
        expect(scope.funcao4).toEqual("Projectos");
    });

});