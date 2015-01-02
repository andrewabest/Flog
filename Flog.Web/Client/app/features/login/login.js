(function (angular) {

    angular.module('app')
        .controller('loginController', ['$location', '$routeParams', 'userService', loginController]);

    function loginController($location, $routeParams, userService) {

        var vm = this;
        vm.login = {};
        vm.signIn = signIn;

        function signIn() {
            userService.login().then(function(data) {
                // stubbed, always success!
                $location.url($routeParams.returnUrl || '/').replace();
            });
        }
    }

})(angular);