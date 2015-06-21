var mainApp = angular.module("mainApp", ["ngRoute", "ngToast"]);

mainApp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/users', {
            templateUrl: 'pages/users.html',
            controller: 'usersController'
        })

        .when('/users/:id', {
            templateUrl: 'pages/usersdetail.html',
            controller: 'usersDetailController'
        })

        .when('/criaruser', {
            templateUrl: 'pages/criaruser.html',
            controller: 'criarUserController'
        })

        // route for the about page
        .when('/tarefas', {
            templateUrl: 'pages/tarefas.html',
            controller: 'tarefasController'
        })

        // route for the contact page
        .when('/recursos', {
            templateUrl: 'pages/recursos.html',
            controller: 'recursosController'
        })

        .otherwise({redirectTo: '/users'})
});

mainApp.config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
        verticalPosition: 'top',
        horizontalPosition: 'right',
        maxNumber: 3,
        timeout: 2000,
        dismissOnTimeout: true
    });
}]);

mainApp.controller("navController", function ($scope) {
    $scope.funcao1 = "Utilizadores";
    $scope.funcao2 = "Tarefas";
    $scope.funcao3 = "Recursos";
});

