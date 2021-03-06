﻿(function(angular) {

    'use strict';

    var controllerId = 'exerciseController';

    angular.module('exercise', ['ui.bootstrap.showErrors'])
        .directive('fgExercise', function () {
            return {
                restrict: 'E',
                scope: {
                    exercises: "=",
                    closecallback: "="
                },
                replace: true,
                templateUrl: 'client/app/features/workout_edit/exercise.html',
                controller: controllerId,
                controllerAs: 'vm'
            }
        })
        .controller(controllerId, ['$scope', exerciseController]);

    function exerciseController($scope) {

        var vm = this;
        vm.exercise = { sets: [] };
        vm.save = save;
        vm.cancel = cancel;

        function save() {

            $scope.exercises.push(vm.exercise);
            vm.exercise = {};
            $scope.closecallback = false;
        }

        function cancel() {

            vm.exercise = {};
            $scope.closecallback = false;
        }
    }

})(angular);