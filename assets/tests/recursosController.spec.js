describe('Test recursosController', function () {

    var $controller, $scope,
        recursos = [
            {"_id": {"$oid": "55940bca42421703002f4278"}, "nivel": "Consultant", "name": "Patricia Ribeiro",
                "email": "ribeiro@ribeiro.pt", "rateHora": 250, "tarefas": [], "__v": 0},
            {"_id": {"$oid": "55940bd942421703002f4279"}, "nivel": "Consultant", "name": "Edson Fernandes",
                "email": "fernandes@fernandes.pt", "rateHora": 350, "tarefas": [], "__v": 0},
            {"_id": {"$oid": "55940b9b42421703002f4275" }, "nivel": "Manager", "name": "Joao Guilherme Sousa",
                "email": "joasousa@deloitte.pt", "rateHora": 120, "tarefas": [{
                "dataInicio": {"$date": "2015-07-01T15:51:38.620Z"}, "projecto": "NDA00102230",
                "name": "Gerir projecto", "dataFim": {"$date": "2015-10-23T23:00:00.000Z"},
                "texto": "Gerir projecto", "_id": {"$oid": "55940c9c42421703002f4282"},
                "status": "Aberta"}],
                "__v": 0, "tem": {}, "tarefa": {}}
        ];

    beforeEach(
        angular.mock.module("mainApp")
    );

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $scope = _$rootScope_.$new();
        var _EmployeeServices_ = {};
        _EmployeeServices_.getAllEmployees = function (callback) {
            callback(recursos);
        };

        $controller = _$controller_('recursosController', {
            $scope: $scope,
            EmployeeServices: _EmployeeServices_
        });
    }));

    it('Correct number of employees assigned', function () {
        expect($scope.empregados.length).toEqual(3);
    });

    it('Check if event handler sets "only free" filter correctly', function () {
        $scope.soLivres = true;
        $scope.soLivresChanged();
        expect( $scope.filtro.tarefa.actual).toEqual("!");

        $scope.soLivres = false;
        $scope.soLivresChanged();
        expect( $scope.filtro.tarefa.actual).toBeUndefined();

    });

});