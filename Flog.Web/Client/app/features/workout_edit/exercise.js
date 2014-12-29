(function(angular) {

    function exerciseController($scope) {

        var vm = this;
        vm.save = save;
        vm.cancel = cancel;

        function save() {
            // construct the exercise object from the bound form data and supply it back to the parent somehow.
        }

        function cancel() {
            // Now do I want to raise an event so that my parent can set its property to false?
        }
    }

    var controllerId = 'exerciseController';

    angular.module('workoutEdit')
        .directive('exercise', function() {
            return {
                restrict: 'E',
                scope: {},
                replace: true,
                templateUrl: 'client/app/features/workout_edit/exercise.html',
                controller: controllerId,
                controllerAs: 'ctrl'
            }
        })
        .controller(controllerId, ['$scope', exerciseController]);

})(angular);