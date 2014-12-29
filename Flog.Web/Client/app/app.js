(function (angular) {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'workoutList']);

    app.config(['$routeProvider', configure]);

    function configure($routeProvider) {
        
        $routeProvider
            .when('/workouts', {
                templateUrl: 'client/app/features/workout.html',
                controller: 'workout'
            })
            //.when('/workouts/:workoutId', {
            //    templateUrl: 'client/app/features/workout.html',
            //    controller: 'workout'
            //})
            .otherwise({
                redirectTo: '/workouts'
            });
    }

    //var app = angular.module('app', ['workoutList']);
    // app.run();

})(angular);