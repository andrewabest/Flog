(function(angular) {

    // http://stackoverflow.com/questions/13762228/confused-about-service-vs-factory/13763886#13763886
    // Factories FTW yo, revealing module pattern 'n all.
    angular.module('app')
        .factory('workoutService', ['$http', workoutService]);

    function workoutService($http) {
        
        return {
            completeWorkout: completeWorkout
        }

        function completeWorkout(workout) {

            $http.post('/workout/complete', workout)
              .success(function (data, status, headers, config) {
                    alert('all good yo!');
                })
              .error(function (data, status, headers, config) {
                  alert('shits broke yo!');
              });
        }
    }

})(angular);