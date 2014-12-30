(function(angular) {
    'use strict';

    var controllerId = 'workoutDetailsController';

    function workoutDetailsController($scope, $routeParams) {

        var vm = this;
        vm.workoutId = $routeParams.workoutId;
        vm.exercises = [];
        vm.addExercise = addExercise;
        vm.addingExercise = false;
        vm.removeExercise = removeExercise;
        // This needs a list of exercises that for each one I can then pass into the exercise directive. I could also put the "Add" method on here and add a new
        // exercise to this collection.

        function addExercise() {

            vm.addingExercise = true;
        }

        function removeExercise(exercise) {

            var index = this.exercises.indexOf(exercise);
            this.exercises.splice(index, 1);
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