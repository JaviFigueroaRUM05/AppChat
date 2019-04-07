(function() {

    var app = angular.module('AppChat',['ngRoute', 'ngFileUpload']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $location) {
        $routeProvider.when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs : 'logingCtrl'
        }).when('/chat', {
            templateUrl: 'pages/main.html',
            controller: 'ChatController',
            controllerAs : 'chatCtrl'
        }).otherwise({
            redirectTo: '/chat'
        });
    }]);

})();
