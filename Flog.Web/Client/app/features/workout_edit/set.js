(function(angular) {

    function setController($scope) {

        var vm = this;
        vm.set = {};
        vm.save = save;
        vm.cancel = cancel;

        function save() {

            $scope.sets.push(vm.set);
            vm.set = {};
            $scope.closecallback = false;
        }

        function cancel() {

            vm.set = {};
            $scope.closecallback = false;
        }
    }

    var controllerId = 'setController';

    angular.module('set', [])
        .directive('fgSet', function() {
            return {
                restrict: 'E',
                scope: {
                    sets: '=',
                    closecallback: '='
                },
                replace: true,
                templateUrl: 'client/app/features/workout_edit/set.html',
                controller: controllerId,
                controllerAs: 'vm'
            }

        })
        .controller(controllerId, ['$scope', setController]);

})(angular);