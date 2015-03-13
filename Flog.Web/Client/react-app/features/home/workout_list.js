(function(flog, react, fluxxor) {
	'use strict';
	
	flog.WorkoutList = React.createClass({

		propTypes: {
			workouts: React.PropTypes.array
		},

		mixins: [
	  		ReactRouter.Navigation, 
	  		flog.mixins.Authentication,
	  		fluxxor.FluxMixin(react),
    		fluxxor.StoreWatchMixin("workout")
	  	],

		getStateFromFlux: function() {

			return {
			  workouts: this.getFlux().store("workout").getWorkouts()
			};
		},

		beginWorkout: function() {
			var workoutId = this.getWorkoutId();
			this.getFlux().actions.workout.add(workoutId);
			this.transitionTo('workout', { id: workoutId });
		},

		getWorkoutId: function () {
		    var d = new Date().getTime();
		    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = (d + Math.random()*16)%16 | 0;
		        d = Math.floor(d/16);
		        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		    });
		    return uuid;
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
					        {this.state.workouts.map(function(workout, i) {
					            return <flog.WorkoutListItem workout={workout} />;
					        })}
					        </ul>
				        </div>
				    </div>
			    </div>
			);
		}
	});

})(window.flog = window.flog || {}, window.React, window.Fluxxor);
	