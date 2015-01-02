(function(angular) {

    angular.module('app')
        .factory('userService', ['$http', '$q', userService]);

    function userService($http, $q) {

        var context = {};

        return {
            login: login,
            context: context
        }       

        function login() {
            var deferred = $q.defer();
            $http.post('/auth/login', {userName: 'John Smith', password: 'password'})
                .success(function (data, status, headers, config) {

                    $http.defaults.headers.common['Authorization'] = 'Bearer myJwtToken';
                    context.userName = data.userName;

                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });

            return deferred.promise;
        }
    }
})(angular);