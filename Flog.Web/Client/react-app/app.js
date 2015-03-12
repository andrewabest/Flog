(function(flog) {
	'use strict';

	var Router = ReactRouter;
	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var Route = Router.Route;
	var NotFoundRoute = Router.NotFoundRoute;
	var Redirect = Router.Redirect;
	var RouteHandler = Router.RouteHandler;

	var App = React.createClass({

	    render: function(){
	        return (
	        	<RouteHandler />
	        );
	    }
	});

	var routes = (
		<Route path="/" handler={App}>
			<Route name="login" handler={flog.Login}/>
			<Route name="workoutList" path="react" handler={flog.WorkoutList} />
			<Route name="newWorkout" path="react/new" handler={flog.Workout} />
			<Route name="editWorkout" path="react/:id" handler={flog.Workout} />
			<NotFoundRoute handler={flog.NotFound}/>
	  	</Route>
	);

	Router.run(routes, Router.HistoryLocation, function (Handler) {
	  React.render(<Handler/>, document.getElementById('app'));
	});

	window.loading_screen.finish();

})(window.flog = window.flog || {});