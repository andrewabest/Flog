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



    //var app = angular.module('app', ['workoutList']);
    // app.run();

})(angular);