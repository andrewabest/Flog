(function() {
	'use strict';
	
	flog.Workout = React.createClass({

		getInitialState: function() {
		    return {
		    	addingExercise: false,
		    	isBusy: false,
		    	isCompleting: false,
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
				showNoExercisesWarning: !this.state.isBusy && !this.state.addingExercise && nextProps.workout.exercises.length == 0,
		    	showCompleteAction: !this.state.isBusy && nextProps.workout.exercises.length > 0
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

		complete: function() {

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
					            <button onClick={this.complete()} disabled={this.state.isCompleting} className="btn btn-success">Workout Complete</button>
					        </div>
					    </div>
					    : null
				    }

				</div>
			);
		}
	});

})(window.flog = window.flog || {});