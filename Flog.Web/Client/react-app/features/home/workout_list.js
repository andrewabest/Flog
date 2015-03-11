(function() {
	'use strict';
	
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

})();
	