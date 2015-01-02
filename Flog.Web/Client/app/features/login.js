(function(angular) {

    angular.module('app')
        .directive('checkUser', ['$rootScope', '$location', 'userSrv', authenticate]);

    function authenticate($rootScope, $location, $userService) {
        
        return {
            link: link
        }

        function link (scope, elem, attrs, ctrl) {
            $rootScope.$on('$routeChangeStart', function (event, currRoute, prevRoute) {

                if (!prevRoute.access.isPublic && !$userService.Context.isLoggedIn) {
                    // Go to login page.

                }
            });
        }
    }
})(angular);

