var mainApp = angular.module('mainApp', ['ngRoute', 'ngToast', 'ui.bootstrap', 'nvd3', 'ui.grid', 'ui.grid.edit',
    'ui.grid.grouping', 'ui.grid.exporter','ui.grid.pinning','angularSpinner']);

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        // route for the home page

        .when('/main', {
            templateUrl: 'pages/main/main.html',
            controller: 'mainController'
        })

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

        .when('/projectos', {
            templateUrl: 'pages/projectos/projectos.html',
            controller: 'projectosController'
        })

        .when('/criarprojecto', {
            templateUrl: 'pages/projectos/projectodetail.html',
            controller: 'projectosDetailController'
        })

        .when('/projectos/:id', {
            templateUrl: 'pages/projectos/projectodetail.html',
            controller: 'projectosDetailController'
        })

        .when('/backlog', {
            templateUrl: 'pages/backlog/backlog.html',
            controller: 'backlogController'
        })

        .when('/oportunidades', {
            templateUrl: 'pages/oportunidades/oportunidades.html',
            controller: 'oportunidadeController'
        })

        .when('/criaroportunidade', {
            templateUrl: 'pages/oportunidades/oportunidadedetail.html',
            controller: 'oportunidadeDetailController'
        })

        .when('/oportunidades/:id', {
            templateUrl: 'pages/oportunidades/oportunidadedetail.html',
            controller: 'oportunidadeDetailController'
        })

        .when('/budget', {
            templateUrl: 'pages/budget/budget.html',
            controller: 'budgetController'
        })
        .when('/login', {
            templateUrl: 'pages/users/login.html'
        })
        //===== yeoman mainapp hook =====//
        .otherwise({ redirectTo: '/main'});

}]);

mainApp.config(['ngToastProvider',function(ngToast) {
    ngToast.configure({
        verticalPosition: 'top',
        horizontalPosition: 'right',
        maxNumber: 3,
        timeout: 2000,
        dismissOnTimeout: true
    });
}]);

mainApp.controller("navController", ['$scope', function ($scope) {
    $scope.funcao1 = "Utilizadores";
    $scope.funcao2 = "Backlog";
    $scope.funcao3 = "Recursos";
    $scope.funcao4 = "Projectos";
    $scope.funcao5 = "Budget";
}]);

