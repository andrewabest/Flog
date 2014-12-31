(function(angular) {
    'use strict';

    var controllerId = 'workoutDetailsController';

    function workoutDetailsController($scope, $routeParams, workoutService) {

        var vm = this;
        vm.workout = { id: $routeParams.workoutId, exercises: [] }
        vm.addExercise = addExercise;
        vm.addingExercise = false;
        vm.complete = complete;

        function addExercise() {

            vm.addingExercise = true;
        }

        function complete() {

            workoutService.completeWorkout(vm.workout);
        }
    }

    angular.module('workoutEdit', ['ngAnimate'])
        .directive('fgWorkoutDetails', function() {
            return {
                restrict: 'E',
                scope: {},
                replace: true,
                templateUrl: 'client/app/features/workout_edit/workout_details.html',
                controller: controllerId,
                controllerAs: 'vm'
            }
        })
        .controller(controllerId, ['$scope', '$routeParams', 'workoutService', workoutDetailsController]);

})(angular);