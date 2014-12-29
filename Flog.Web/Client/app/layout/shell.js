(function(angular) {
    'use strict';

    var controllerId = 'shell';
    angular.module('app').controller(controllerId, ['$scope', shell]);

    function shell($scope) {
        var vm = this;
        vm.content = 'hey there you!';
    }
})(angular);