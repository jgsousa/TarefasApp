var mainApp = angular.module("mainApp", ['ngRoute', 'ngToast', 'ui.bootstrap']);

mainApp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/users', {
            templateUrl: 'pages/user/users.html',
            controller: 'usersController'
        })

        .when('/users/:id', {
            templateUrl: 'pages/user/usersdetail.html',
            controller: 'usersDetailController'
        })

        .when('/criaruser', {
            templateUrl: 'pages/user/criaruser.html',
            controller: 'criarUserController'
        })

        // route for the about page
        .when('/tarefas', {
            templateUrl: 'pages/tarefas/tarefas.html',
            controller: 'tarefasController'
        })

        // route for the contact page
        .when('/recursos', {
            templateUrl: 'pages/recursos/recursos.html',
            controller: 'recursosController'
        })

        .when('/criarrecursos', {
            templateUrl: 'pages/recursos/criarrecurso.html',
            controller: 'criarRecursosController'
        })

        .when('/recursos/:id', {
            templateUrl: 'pages/recursos/recursosdetail.html',
            controller: 'recursosDetailController'
        })

        .when('/recursos/:id/tarefa/:tarefa', {
            templateUrl: 'pages/tarefas/tarefasdetail.html',
            controller: 'tarefasDetailController'
        })

        .when('/recursos/:id/novatarefa', {
            templateUrl: 'pages/tarefas/tarefasdetail.html',
            controller: 'tarefasDetailController'
        })

        .otherwise({ redirectTo: '/users'});

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

