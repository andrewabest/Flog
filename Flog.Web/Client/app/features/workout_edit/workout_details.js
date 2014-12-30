(function(angular) {
    'use strict';

    var controllerId = 'workoutDetailsController';

    function workoutDetailsController($scope, $routeParams) {

        var vm = this;
        vm.workoutId = $routeParams.workoutId;
        vm.exercises = [];
        vm.addExercise = addExercise;
        vm.addingExercise = false;

        function addExercise() {

            vm.addingExercise = true;
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
        .controller(controllerId, ['$scope', '$routeParams', workoutDetailsController]);

})(angular);