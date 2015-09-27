mainApp.service('ProjectoServices', ['$http', function ($http) {

    this.getAllProjectos = function (successCallback, errorCallback) {
        return $http.get('/projectos/projectos').
            then(function(response){
                return response.data;
            });

    };

    this.getProjectoForId = function (id, successCallback, errorCallback) {
        return $http.get('/projectos/projectos' + '/' + id).
            then(function(response){
               return response.data;
            });
    };

    this.createProjecto = function (data, successCallback, errorCallback) {
        return $http.post('/projectos/projectos', data, {}).
            then(function(response){
               return response.data;
            });
    };

    this.updateProjecto = function (id, data, successCallback, errorCallback) {
        return $http.put('/projectos/projectos' + '/' + id, data, {}).
            then(function(response){
               return response.data;
            });
    };

    this.deleteProjecto = function (id, successCallback, errorCallback) {
        return $http.delete('/projectos/projectos' + '/' + id, {}).
            then(function(response){
               return response.data;
            });
    };

    this.getNetFeesForEmpregados = function (recursos) {
        var dados = [];
        var empregados = {};
        recursos.forEach(function(element){
            empregados[element._id] = element;
        });

        return $http.get('/projectos/projectos').
            then(function(response){
                var data = response.data;
                data.forEach(function(projecto){
                    projecto.horas.forEach(function(horas){
                        var periodo = dados[horas.periodo];
                        if (!periodo){
                            periodo = {};
                            periodo.id = horas.periodo;
                            periodo.projectos = {};
                            dados[periodo.id] = periodo;
                        }
                        var empregado = empregados[horas.recursoId];
                        if (empregado){
                            var proj = periodo.projectos[projecto._id];
                            if (!proj){
                                proj = {};
                                proj._id = projecto._id;
                                proj.codigo = projecto.codigo;
                                proj.valor = 0;
                                periodo.projectos[proj._id] = proj;
                            }
                            proj.valor = proj.valor + horas.numero * empregado.rateHora;
                        }
                    });
                });
                return dados;
            });

    };

}]);