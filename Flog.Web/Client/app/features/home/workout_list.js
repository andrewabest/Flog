(function(angular, moment, _) {

    'use strict';

    var controllerId = 'workoutListController';

    angular.module('home', [])
        .directive('fgWorkoutList', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'client/app/features/home/workout_list.html',
                replace: true,
                controller: controllerId,
                controllerAs: 'vm'
            };
        })
        .controller(controllerId, ['$scope', '$location', 'workoutService', workoutListController]);

    function workoutListController($scope, $location, workoutService) {

        var vm = this;
        vm.begin = begin;
        vm.isbusy = false;
        vm.workouts = [];
        vm.open = open;

        activate();

        function activate() {

            vm.isbusy = true;

            workoutService.getWorkouts().then(function (data) {

                vm.workouts = _.map(data, function (x) {
                    x.display = moment(x.date).format("dddd, MMMM Do YYYY, h:mm a");
                    return x;
                });

                vm.isbusy = false;
            });
        }

        function begin() {
            $location.path('/workouts/new');
        }

        function open(workout) {
            $location.path('/workouts/' + workout.id.toString());
        }
    }

})(angular, moment, _);