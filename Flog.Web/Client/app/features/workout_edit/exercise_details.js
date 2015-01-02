(function(angular) {

    'use strict';

    var controllerId = 'exerciseDetailsController';

    angular.module('exerciseDetails', [])
        .directive('fgExerciseDetails', function () {
            return {
                restrict: 'E',
                scope: {
                    exercise: '=',
                    exercises: '='
                },
                replace: true,
                templateUrl: 'client/app/features/workout_edit/exercise_details.html',
                controller: controllerId,
                controllerAs: 'vm'
            }
        })
        .controller(controllerId, ['$scope', exerciseDetailsController]);

    function exerciseDetailsController($scope) {
        
        var vm = this;
        vm.exercises = $scope.exercises;
        vm.exercise = $scope.exercise;
        vm.remove = remove;
        vm.addSet = addSet;
        vm.addingSet = false;

        function remove() {

            var index = vm.exercises.indexOf(vm.exercise);
            vm.exercises.splice(index, 1);
        }

        function addSet() {
            vm.addingSet = true;
        }
    }

})(angular);