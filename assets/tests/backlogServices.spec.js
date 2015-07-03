xdescribe('Test BacklogService', function () {

    var mockProjecto, mockEmployee, mockServiceObj;

    var projectos = [{
        "_id": {
            "$oid": "55940c6942421703002f4280"
        },
        "estado": "Aberto",
        "name": "Projecto 1",
        "codigo": "PROJ1",
        "dataInicio": {
            "$date": "2015-05-05T23:00:00.000Z"
        },
        "dataFim": {
            "$date": "2015-09-23T23:00:00.000Z"
        },
        "texto": "Projecto 1",
        "horas": [
            {
                "recursoId": "55940c0a42421703002f427c",
                "numero": 200,
                "periodo": "201506",
                "_id": {
                    "$oid": "55950b4f8384910300de78c2"
                }
            },
            {
                "recursoId": "55940bf542421703002f427b",
                "numero": 200,
                "periodo": "201506",
                "_id": {
                    "$oid": "55950b6c8384910300de78c3"
                }
            }
        ],
        "__v": 0
    },
        {
            "_id": {
                "$oid": "55940c8542421703002f4281"
            },
            "estado": "Aberto",
            "name": "Projecto 2",
            "codigo": "PROJ2",
            "dataInicio": {
                "$date": "2015-05-05T23:00:00.000Z"
            },
            "dataFim": {
                "$date": "2015-09-24T23:00:00.000Z"
            },
            "texto": "Projecto 2",
            "horas": [
                {
                    "recursoId": "55940be842421703002f427a",
                    "numero": 120,
                    "periodo": "201506",
                    "_id": {
                        "$oid": "55950b778384910300de78c5"
                    }
                },
                {
                    "recursoId": "55940be842421703002f427a",
                    "numero": 150,
                    "periodo": "201506",
                    "_id": {
                        "$oid": "55952fd33285a4030048cca8"
                    }
                }
            ],
            "__v": 0
        }
    ];
    beforeEach(
        angular.mock.module("mainApp")
    );

    beforeEach(inject(function (ProjectoServices, EmployeeServices, BacklogServices) {
        mockProjecto = ProjectoServices;
        mockEmployee = EmployeeServices;
        mockServiceObj = BacklogServices;
        spyOn(mockProjecto, 'getAllProjectos').and.returnValue(projectos);
    }));

    it('verify if projects are ok', function () {


        expect(mockWindow.alert).toHaveBeenCalledWith(message);
        expect(mockModalSvc.showModalDialog).not.toHaveBeenCalled();
    });
});