(function() {
	'use strict';

	var Workout = React.createClass({

		editWorkout: function() {
			alert('edit!');
		},

		render: function () {
			return (
				<div><a onClick={this.editWorkout}>{this.props.workout.display}</a></div>
			);
		}
	});
	
	var WorkoutList = React.createClass({

		beginWorkout: function() {
			alert('begin!');
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
					        {this.props.workouts.map(function(workout, i) {
					            return <Workout workout={workout} />;
					        })}
				        </div>
				    </div>
			    </div>
			);
		}
	});

	var App = React.createClass({
	    render: function(){
	        return (
	            <WorkoutList workouts={[{display: 'Workout one'}, {display: 'Workout two'}]} />
	        );
	    }
	});

	window.loading_screen.finish();

	React.render(
        <App />,
        document.getElementById('app')
    );

})();
