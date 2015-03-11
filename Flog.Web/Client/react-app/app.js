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

	var Set = React.createClass({

		propTypes: {
			addSetCallback: React.PropTypes.func.isRequired,
			closeCallback: React.PropTypes.func.isRequired
		},

		mixins: [React.addons.LinkedStateMixin],

		getInitialState: function() {
			return {weight: '', reps: '', rpe: ''};
		},

		handleSubmission: function(e) {
			e.preventDefault();
			this.props.addSetCallback({weight: this.state.weight, reps: this.state.reps, rpe: this.state.rpe});
		},

		cancel: function(e) {
			e.preventDefault();
			this.props.closeCallback();
		},

		render: function() {
			return (
				<div>
				    <form className="form-inline" name="setForm" onSubmit={this.handleSubmission}>
				        <fieldset>
				            <div className="form-group">
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="weight" name="weight" placeholder="Weight" valueLink={this.linkState('weight')} />
				                </div>
				            </div>
				            <div className="form-group" show-errors>
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="reps" name="reps" placeholder="Reps" valueLink={this.linkState('reps')} />
				                </div>
				            </div>
				            <div className="form-group">
				                <div className="col-md-2">
				                    <input type="text" className="form-control" id="rpe" name="rpe" placeholder="RPE" valueLink={this.linkState('rpe')} />
				                </div>
				            </div>
				            <div className="form-group">
				                <button onClick={this.cancel} className="btn btn-default">Cancel</button>
				                {' '}
				                <button type="submit" className="btn btn-primary">Save</button>
				            </div>
				        </fieldset>
				    </form>
				</div>
			);
		}
	});

	var ExerciseDetails = React.createClass({

		getInitialState: function() {
			return { 
				addingSet: false,
				sets: [] 
			};
		},

		addSet: function() {
			this.setState({addingSet: true});
		},

		addSetCompleted: function(set) {

			var sets = this.state.sets;
			sets.push(set);

			this.setState({
				sets: sets,
				addingSet: false
			});
		},

		addSetCancelled: function() {
			this.setState({
				addingSet: false
			});
		},

		remove: function() {
			// TODO
		},

		componentDidMount: function() {
			Console.Log(this.props.exercise.name);
		},

		render: function() {

			var containerStyle = {
				borderBottom: '1px dashed #eee',
				marginBottom: 15
			}

			var rowStyle = {
				marginBottom: 15
			}

			var rightAlignedTextStyle = {
				textAlign: 'right'
			}

			return (
				<div style={containerStyle}>
				    <div className="row" style={rowStyle}>
				        <div className="col-md-2">
				            <strong>{this.props.exercise.name}</strong>
				        </div>
				        <div className="col-md-6">
				            {this.props.exercise.description}
				        </div>
				        <div className="col-md-4" style={rightAlignedTextStyle}>
				            <button onClick={this.addSet} className="btn btn-success">Add Set</button>
				            {' '}
				            <button onClick={this.remove} className="confirmButton btn btn-danger" confirm-button>Remove</button>
				        </div>
				    </div>
			    	{
			    		this.state.addingSet ?
			    		<div className="row" style={rowStyle}>
					        <div className="col-md-12 well">
					            <Set addSetCallback={this.addSetCompleted} closeCallback={this.addSetCancelled} />
					        </div>
					    </div>
					    : null
			    	}

				    <div className="row" style={rowStyle}>
				        {this.state.sets.map(function(set, i) {
				            return <div className="col-md-12"><p>{set.weight}{' x '}{set.reps}{' @ '}{set.rpe}{' RPE'}</p></div>;
				        })}
				    </div>
				</div>
			);
		}
	})

	var Exercise = React.createClass({

		propTypes: {
			addExerciseCallback: React.PropTypes.func.isRequired,
			closeCallback: React.PropTypes.func.isRequired
		},

		mixins: [React.addons.LinkedStateMixin],

		getInitialState: function() {
			return { name: '', description: ''};
		},

		handleSubmission: function(e) {
			e.preventDefault();
			this.props.addExerciseCallback({name: this.state.name, description: this.state.description, sets: []});
		},

		cancel: function(e) {
			e.preventDefault();
			this.props.closeCallback();
		},

		render: function() {
			return (
				<div>
				    <form onSubmit={this.handleSubmission} className="form-horizontal">
				        <fieldset>
				            <legend>New Exercise</legend>
				            <div className="form-group" show-errors>
				                <label className="col-md-2 control-label" htmlFor="name">Name</label>
				                <div className="col-md-10">
				                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter exercise name" valueLink={this.linkState('name')} required />
				                </div>
				            </div>
				            <div className="form-group">
				                <label className="col-md-2 control-label" htmlFor="description">Description</label>
				                <div className="col-md-10">
				                    <input type="text" className="form-control" id="description" name="description" placeholder="Enter a description" valueLink={this.linkState('description')} />
				                </div>
				            </div>
				            <div className="form-group">
				                <div className="col-md-10 col-md-offset-2">
				                    <button className="btn btn-default" onClick={this.cancel}>Cancel</button>
				                    {' '}
				                    <button className="btn btn-primary">Save</button>
				                </div>
				            </div>
				        </fieldset>
				    </form>
				</div>

			);
		}
	})

	var Workout = React.createClass({

		getInitialState: function() {
		    return {
		    	addingExercise: false,
		    	isBusy: false,
		    	exercises: []
		    };
		},

		getDefaultProps: function() {

			var date = moment();
			// this.getParams().Id
			return {
				workout: { id: null, date: date, display: date.format("dddd, MMMM Do YYYY, h:mm a") }
			};
		},

		componentDidMount: function() {
			// Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this point in the lifecycle, the component has a DOM representation which you can access via React.findDOMNode(this).
			// If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, or send AJAX requests, perform those operations in this method.
		},

		componentWillReceiveProps: function(nextProps) {
			// Invoked when a component is receiving new props. This method is not called for the initial render.
			// Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
			setState({
				showNoExercisesWarning: this.state.isBusy && !this.state.addingExercise && nextProps.workout.exercises.length == 0,
		    	showCompleteAction: this.state.isBusy && nextProps.workout.exercises.length > 0
			});
		},

		componentWillUpdate: function() {
			// New props / state available for scruitiny / pre prep.
		},

		componentDidUpdate: function() {
			// New props / state recieved
		},
		
		addExercise: function() {
			this.setState({
				addingExercise: true
			});
		},

		addExerciseCompleted: function(exercise) {

			var exercises = this.state.exercises;
			exercises.push(exercise);

			this.setState({
				exercises: exercises,
				addingExercise: false
			});
		},

		addExerciseCancelled: function() {
			this.setState({
				addingExercise: false
			});
		},

		render: function () {

			// Get the workout Id supplied via url.
			//this.getParams().Id

			var rowStyle = {
				marginBottom: 15
			};

			var fullWidthStyle = {
				width: '100%'
			}

			return (
				<div>
				    <div className="page-header">
				        <div className="row">
				            <div className="col-md-12">
				                <h1>Workout {this.props.workout.display}</h1>
				            </div>
				        </div>
				    </div>
				    <div className="row" style={rowStyle}>
				        <div className="col-md-12 well">
				            <button disabled={this.state.addingExercise} onClick={this.addExercise} className="btn btn-success">Add Exercise</button>
				            <div className="exerciseContainer">
				                {
				                	this.state.addingExercise ?
				                	<Exercise className="exercise" addExerciseCallback={this.addExerciseCompleted} closeCallback={this.addExerciseCancelled} />
				                	: null
				                }	
				            </div>
				        </div>
				    </div>
				    <div className="row" style={rowStyle}>
				        <div className="col-md-12">
				            <div className="bs-component" hidden={!this.state.isBusy}>
				                <div className="progress progress-striped active">
				                    <div className="progress-bar" style={fullWidthStyle}></div>
				                </div>
				            </div>
				        </div>
				    </div>

				    <div>
				    	<ul>
					        {this.state.exercises.map(function(exercise, i) {
					            return <ExerciseDetails exercise={exercise} />;
					        })}
				        </ul>
				    </div>

				    { 
				    	this.state.showNoExercisesWarning ? 
				    	<div className="row">
					        <div className="col-md-12">
					            <div className="alert alert-dismissable alert-warning">
					                No exercises have been added yet.
					            </div>
					        </div>
					    </div> 
				    	: null 
				    }

				    {
			    		this.state.showCompleteAction ?
			    		<div className="row">
					        <div className=" col-md-12 well">
					            <button ng-click="vm.complete()" className="btn btn-success" ng-disabled="vm.processing">Workout Complete</button>
					        </div>
					    </div>
					    : null
				    }

				</div>
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
			<Route name="newWorkout" path="react/new" handler={Workout} />
			<Route name="editWorkout" path="react/:id" handler={Workout} />
			<NotFoundRoute handler={NotFound}/>
	  	</Route>
	);

	Router.run(routes, Router.HistoryLocation, function (Handler) {
	  React.render(<Handler/>, document.getElementById('app'));
	});

	window.loading_screen.finish();

})();
