(function(angular) {
    'use strict';

    var controllerId = 'workoutDetailsController';

    function workoutDetailsController($scope, $routeParams) {

        this.workoutId = $routeParams.workoutId;

    }

    angular.module('workoutEdit', [])
        .directive('fgWorkoutDetails', function() {
            return {
                restrict: 'E',
                scope: {},
                replace: true,
                templateUrl: 'client/app/features/workout_edit/workout_details.html',
                controller: controllerId,
                controllerAs: 'ctrl'
            }
        })
        .controller(controllerId, ['$scope', '$routeParams', workoutDetailsController]);

})(angular);