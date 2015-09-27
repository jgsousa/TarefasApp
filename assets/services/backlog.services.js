mainApp.service('BacklogServices', ['ProjectoServices', 'EmployeeServices', function (ProjectoServices, EmployeeServices) {

    var getHoras = function (projecto, recurso, periodo) {
        for (var i = 0; i < projecto.horas.length; i++) {
            var horas = projecto.horas[i];
            if (horas.recursoId == recurso && horas.periodo == periodo) {
                return horas;
            }
        }
        return undefined;
    };

    this.getBacklogColumnDefs = function () {
        var columnDefs = [];
        return ProjectoServices.getAllProjectos().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                columnDefs.push({headerName: data[i].name, field: data[i].codigo, projectId: data[i]._id});
            }
            return columnDefs;
        });
    };

    this.getBacklogData = function (periodo) {
        var data = [];
        var d;
        return ProjectoServices.getAllProjectos().then(function (projData) {
            var projects = projData;
            return EmployeeServices.getAllEmployees().then(function (recursos) {
                for (var i = 0; i < recursos.length; i++) {
                    d = {
                        nivel: recursos[i].nivel, recurso: recursos[i].name,
                        rate: recursos[i].rateHora, recursoid: recursos[i]._id,
                        horas: 0
                    };
                    for (var j = 0; j < projects.length; j++) {
                        var projecto = projects[j];
                        var horas = getHoras(projects[j], recursos[i]["_id"], periodo);
                        if (horas) {
                            d[projecto.codigo] = horas.numero;
                            d.horas = d.horas + horas.numero;
                        } else {
                            d[projecto.codigo] = 0;
                        }
                    }
                    data.push(d);
                }
                return data;
            });
        }).then(function(data) {
            return data;
        });
    };

    this.updateProjecto = function (codigo, horas, periodo, recurso) {

        var success = function () {

        };

        var error = function () {

        };

        ProjectoServices.getProjectoForId(codigo).then(function (data) {
            var objHoras = getHoras(data, recurso, periodo);
            if (!objHoras) {
                objHoras = {};
                objHoras.recursoId = recurso;
                objHoras.numero = horas;
                objHoras.periodo = periodo;
                data.horas.push(objHoras);
            } else {
                objHoras.numero = horas;
            }
            ProjectoServices.updateProjecto(data._id, data, success, error);
        });
    };
}]);