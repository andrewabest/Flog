(function() {
	'use strict';

	var Router = ReactRouter;
	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var Route = Router.Route;
	var NotFoundRoute = Router.NotFoundRoute;
	var Redirect = Router.Redirect;
	var RouteHandler = Router.RouteHandler;
	var Navigation = Router.Navigation;

	var NewWorkout = React.createClass({

		render: function () {
			return (
				<h1>Hello New Workout!</h1>
			);
		}
	});

	var Workout = React.createClass({

		render: function () {
			return (
				<h1>Hello Workout!</h1>
			);
		}
	});

	var WorkoutListItem = React.createClass({

		propTypes: {
			workout: React.PropTypes.object.isRequired,
		},

		render: function () {
			return <li><Link to="editWorkout" params={{id: this.props.workout.id}}>{this.props.workout.display}</Link></li>;
		}
	});
	
	var WorkoutList = React.createClass({

		propTypes: {
			workouts: React.PropTypes.array,
		},

		getDefaultProps: function() {
		    return {
		    	workouts: [{key:0, id:0, display: 'Workout one'}, {key:1, id:1, display: 'Workout two'}]
		    };
	  	},

	  	mixins: [Navigation],

		beginWorkout: function() {
			this.transitionTo('newWorkout');
		},

		render: function() {

		    var beginStyle = {
		    	marginBottom: 0
		    };

		    var workoutRowStyle = {
		    	marginBottom: 15
		    };

	        return (
	        	<div>
	        		<div className="row">
			            <div className="col-md-12 well" style={beginStyle}>
			                <button onClick={this.beginWorkout} className="btn btn-success">Begin Workout</button>
			            </div>
			        </div>
				    <div className="row">
				        <div className="col-md-12">
				            <h1>Workouts</h1>
				        </div>
				    </div>
				    <div className="row" style={workoutRowStyle}>
				        <div className="col-md-12 well">
				        	<ul>
					        {this.props.workouts.map(function(workout, i) {
					            return <WorkoutListItem workout={workout} />;
					        })}
					        </ul>
				        </div>
				    </div>
			    </div>
			);
		}
	});

	

	var NotFound = React.createClass({
		render: function() {
			return  <p>Do or do not.<br />There is no route.<br />-Yoda</p>;
		}
	});

	var WorkoutNotFound = React.createClass({
		render: function() {
			return  <p>Do or do not.<br />There is no workout.<br />-Yoda</p>;
		}
	});

	var App = React.createClass({
	    render: function(){
	        return (
	        	<RouteHandler />
	        );
	    }
	});

	var routes = (
		<Route path="/" handler={App}>
			<Route name="workoutList" path="react" handler={WorkoutList} />
			<Route name="newWorkout" path="react/new" handler={NewWorkout} />
			<Route name="editWorkout" path="react/:id" handler={Workout} />
			<NotFoundRoute handler={NotFound}/>
	  	</Route>
	);

	Router.run(routes, Router.HistoryLocation, function (Handler) {
	  React.render(<Handler/>, document.getElementById('app'));
	});

	window.loading_screen.finish();

})();
