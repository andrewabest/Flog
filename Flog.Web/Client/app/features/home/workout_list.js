﻿(function(angular) {
    'use strict';

    
    // Shamelessley taken from http://stackoverflow.com/a/8809472/899705
    function getWorkoutId() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function workoutListController($scope, $location, workoutService) {

        var vm = this;
        vm.begin = begin;
        vm.isbusy = false;
        vm.workouts = [];

        activate();

        function activate() {

            vm.isbusy = true;

            workoutService.getWorkouts().then(function (data) {
                vm.workouts = data;
                vm.isbusy = false;
            });
        }

        function begin() {
            var workoutId = getWorkoutId();
            $location.path('/workouts/' + workoutId.toString());
        }
    }

    var controllerId = 'workoutListController';

    angular.module('home', [])
        .directive('fgWorkoutList', function() {
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

})(angular);