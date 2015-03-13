(function(flog, $) {

    flog.services = flog.services || {};

    flog.services.workout = (function() {
        return {
            completeWorkout: completeWorkout,
            getWorkouts: getWorkouts,
            getWorkout: getWorkout
        }

        function completeWorkout(workout) {

            return $.ajax({
                contentType: 'application/json',
                data: JSON.stringify(workout),
                dataType: 'json',
                type: 'POST',
                url: '/workout/complete'
            });
        }

        function getWorkouts() {

            // var deferred = $q.defer();
            // $http.get('/workout/all')
            //     .success(function (data, status, headers, config) {
            //         deferred.resolve(data);
            //     })
            //     .error(function (data, status, headers, config) {
            //         deferred.reject(data);
            //     });
            // return deferred.promise;
        }

        function getWorkout(id) {

            // var deferred = $q.defer();
            // $http.get('/workout/' + encodeURIComponent(id))
            //     .success(function (data, status, headers, config) {
            //         deferred.resolve(data);
            //     })
            //     .error(function (data, status, headers, config) {
            //         deferred.reject(data);
            //     });
            // return deferred.promise;
        }

    })();

})(window.flog = window.flog || {}, window.jQuery);