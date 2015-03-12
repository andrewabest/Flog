(function(flog, $) {

	flog.services = flog.services || {};

    flog.services.user = (function() {

		var context = {};

        return {
            login: login,
            context: context
        }       

        function login() {

            var promise = $.post('/auth/login', {userName: 'John Smith', password: 'password'}, function (data, status, headers, config) {

				$.ajaxSetup({
				    headers: { 'Authorization': 'Bearer myJwtToken' }
				});

			    context.isAuthenticated = data.authenticated;
			    context.userName = data.userName;
			});
			
			return promise;
        }
    })();

})(window.flog = window.flog || {}, window.jQuery);