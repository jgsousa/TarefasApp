mainApp.service('BacklogServices', function (ProjectoServices, EmployeeServices) {

    var getHoras = function(projecto, recurso){
        for(var i = 0; i < projecto.horas.length; i++){
            var horas = projecto.horas[i];
            if(horas.recursoId == recurso._id){
               return horas;
            }
        }
        return undefined;
    };

    this.getBacklogColumnDefs = function (callback) {
        var columnDefs = [];
        ProjectoServices.getAllProjectos(function (data) {
            for (var i = 0; i < data.length; i++) {
                columnDefs.push({headerName: data[i].name, field: data[i].codigo, projectId:data[i]._id});
            }
            callback(columnDefs);
        }, function(err){
            alert("deu merda");
        });
    };

    this.getBacklogData = function (periodo, callback) {
        var data = [];
        ProjectoServices.getAllProjectos(function (projData) {
            var projects = projData;
            EmployeeServices.getAllEmployees(function (recursos) {
                for (var i = 0; i < recursos.length; i++) {
                    d = { nivel: recursos[i].nivel, recurso: recursos[i].name,
                            rate: recursos[i].rateHora,  recursoid:recursos[i]._id};
                    for(var j = 0; j < projects.length; j++){
                        var projecto = projects[j];
                        var horas = getHoras(projects[j], recursos[i]);
                        if(horas) {
                            d[projecto.codigo] = horas.numero;
                        }
                        else{
                            d[projecto.codigo] = 0;
                        }
                    }
                    data.push(d);
                }
                callback(data);
            }, function(err){
                console.log("mais merda");
            });
        }, function(err){
            alert("deu merda");
        });
    };

    this.updateProjecto = function(codigo, horas, periodo, recurso){

        var success = function(){

        };

        var error = function(){

        };

        ProjectoServices.getProjectoForId(codigo, function(data){
            var objHoras = getHoras(data, recurso);
            if(!objHoras){
                objHoras = {};
                objHoras.recursoId = recurso;
                objHoras.numero = horas;
                objHoras.periodo = periodo;
                data.horas.push(objHoras);
            }
            else{
                objHoras.numero = objHoras.numero + horas;
            }
            ProjectoServices.updateProjecto(data._id, data, success, error);
        }, function(err){
            console.log("merdum no update");
        });
    }
});