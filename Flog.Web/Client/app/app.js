(function (angular) {
    'use strict';

    var app = angular.module(
        'app',
        [
            'ngRoute',
            'home',
            'workoutEdit',
            'exercise',
            'exerciseDetails',
            'set',
        ]);

    app.config(['$routeProvider', configure]);

    function configure($routeProvider) {
        
        $routeProvider
            .when('/login', {
                templateUrl: 'client/app/features/login/login.html',
                controller: 'loginController',
                allowAnonymous: true
            })
            .when('/workouts', {
                templateUrl: 'client/app/features/home/home.html',
                controller: 'homeController'
            })
            .when('/workouts/new', {
                templateUrl: 'client/app/features/workout_edit/workout_edit.html',
                controller: 'workoutEditController'
            })
            .when('/workouts/:workoutId', {
                templateUrl: 'client/app/features/workout_edit/workout_edit.html',
                controller: 'workoutEditController'
            })
            .otherwise({
                redirectTo: '/workouts'
            });
    }

    // Handle routing errors and success events
    app.run(['$rootScope', '$route', '$location', 'userService', function ($rootScope, $route, $location, userService) {
        // Include $route to kick start the router.

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (next && next.$$route && next.$$route.allowAnonymous) {
                return;
            } else if (!userService.context.isAuthenticated) {
                $location.url('/login?returnUrl=' + encodeURIComponent($location.url()));
                $location.replace();
            }
        });
    }]);

    window.loading_screen.finish();

})(angular);