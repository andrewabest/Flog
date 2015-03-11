(function() {
	'use strict';
	
	var WorkoutListItem = React.createClass({

		propTypes: {
			workout: React.PropTypes.object.isRequired,
		},

		render: function () {
			return <li><Link to="editWorkout" params={{id: this.props.workout.id}}>{this.props.workout.display}</Link></li>;
		}
	});

})();