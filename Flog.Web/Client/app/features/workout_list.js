(function(angular) {
    'use strict';

    angular.module('workoutList', [])
        .directive('fgWorkoutList', function() {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'client/app/features/workout_list.html',
                replace: true,
                controller: 'workoutListController',
                controllerAs: 'ctrl'
            };
        })
        .controller('workoutListController', ['$scope', workoutListController]);

    function workoutListController($scope) {
        
    }

})(angular);