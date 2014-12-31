(function(angular) {

    // http://stackoverflow.com/questions/13762228/confused-about-service-vs-factory/13763886#13763886
    // Factories FTW yo, revealing module pattern 'n all.
    angular.module('app')
        .factory('workoutService', ['$http', '$q', workoutService]);

    function workoutService($http, $q) {
        
        return {
            completeWorkout: completeWorkout,
            getWorkouts: getWorkouts
        }

        function completeWorkout(workout) {

            var deferred = $q.defer();
            $http.post('/workout/complete', workout)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getWorkouts() {

            var deferred = $q.defer();
            $http.get('/workout/all')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    }

})(angular);