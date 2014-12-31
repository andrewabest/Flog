(function(angular) {
    'use strict';

    var controllerId = 'workoutDetailsController';

    function workoutDetailsController($scope, $routeParams, $location, workoutService) {

        var vm = this;
        vm.workout = { id: $routeParams.workoutId, exercises: [] }
        vm.addExercise = addExercise;
        vm.addingExercise = false;
        vm.complete = complete;
        vm.processing = false;

        function addExercise() {

            vm.addingExercise = true;
        }

        function complete() {

            vm.processing = true;

            workoutService.completeWorkout(vm.workout).then(function(data) {
                swal({
                    title: "Workout Completed!",
                    type: "success"
                },
                processingFinished);
            });
        }

        function processingFinished(isConfirmed) {
            
            vm.processing = false;

            $location.path('/workouts');
            $location.replace();
            $scope.$apply();
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
        .controller(controllerId, ['$scope', '$routeParams', '$location', 'workoutService', workoutDetailsController]);

})(angular);