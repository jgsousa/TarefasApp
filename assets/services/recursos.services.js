mainApp.service('EmployeeServices', ['$http', '$q',function ($http, $q) {

    this.getAllEmployees = function () {
        return $http.get('/recursos/recursos').
        then(function(response){
            return response.data;
        });
    };

    this.getEmployeeForId = function (id) {
        return $http.get('/recursos/recursos/' + id).
        then(function(response){
            return response.data;
        });
    };

    this.createEmployee = function (data){
        return $http.post('/recursos/recursos/', data, {}).
        then(function(response){
            return response.data;
        });
    };

    this.updateEmployee = function (id, data, successCallback, errorCallback) {
        return $http.put('/recursos//recursos/' + id, data, {}).
        then(function(response){
            return response.data;
        });
    };

    var update = this.updateEmployee;
    var create = this.createEmployee;

    this.deleteEmployee = function (id, successCallback, errorCallback) {
        return $http.delete('/recursos//recursos/' + id, {}).
        then(function(response){
            return response.data;
        });
    };

    this.createTarefaForEmployee = function (idEmpregado, data, successCallback, errorCallback) {
        return $http.post('/recursos/recursos/' + idEmpregado + '/tarefa', data, {}).
        then(function(response){
            return response.data;
        });
    };

    this.updateTarefaForEmployee = function (idEmpregado, data, successCallback, errorCallback) {
        return $http.put('/recursos/recursos/' + idEmpregado + '/tarefa/' + data._id, data, {}).
        then(function(response){
            return response.data;
        });
    };

    this.recursosFromArray = function(arrData){
        var employees = [];
        var employee;
        arrData.forEach(function(element){
            employee = {};
            employee.codigo = element[0];
            employee.nome = element[1];
            employee.rateHora = element[2];
            if (employee.codigo != "") {
                employees.push(employee);
            }
        });
        return employees;
    };

    this.updateFromArray = function(newData,oldData){
        var actualizacao = [];
        var criar = [];
        newData.forEach(function(newElem){
            var existe = false;
            oldData.forEach(function(oldElem){
                if (newElem.codigo == oldElem.codigo){
                    oldElem.rateHora = newElem.rateHora;
                    oldElem.nivel = newElem.nivel;
                    actualizacao.push(oldElem);
                    existe = true;
                }
            });
            if (!existe){
                var recurso = {};
                recurso.codigo = newElem.codigo;
                recurso.rateHora = newElem.rateHora;
                recurso.name = newElem.nome;
                recurso.nivel = newElem.nivel;
                criar.push(recurso);
            }
        });
        actualizacao.forEach(function(toUpdate){
            update(toUpdate._id, toUpdate);
        });
        criar.forEach(function(element){
            create(element);
        });
    };

    this.sendRecursosMail = function(){
        return $http.get('/recursos/mailrecursos/', {}).
        then(function(response){
            return response.data;
        }, function(error){
            return $q.reject(error);
        });
    };

    this.downloadFile = function(defaultFileName){
        var deferred = $q.defer();
        $http.get('/recursos/filerecursos/', { responseType: "arraybuffer" }).success(
            function (data, status, headers) {
                var type = headers('Content-Type');
                var disposition = headers('Content-Disposition');
                if (disposition) {
                    var match = disposition.match(/.*filename=\"?([^;\"]+)\"?.*/);
                    if (match[1]) {
                        defaultFileName = match[1];
                    }
                }
                defaultFileName = defaultFileName.replace(/[<>:"\/\\|?*]+/g, '_');
                var blob = new Blob([data], { type: type });
                saveAs(blob, defaultFileName);
                deferred.resolve(defaultFileName);
            }).error(function (data, status) {
            var e = /* error */
                deferred.reject(e);
        });
        return deferred.promise;
    };
}]);