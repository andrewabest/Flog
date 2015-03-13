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

            return $.get('/workout/all');
        }

        function getWorkout(id) {

            return $.get('/workout/' + encodeURIComponent(id));
        }

    })();

})(window.flog = window.flog || {}, window.jQuery);